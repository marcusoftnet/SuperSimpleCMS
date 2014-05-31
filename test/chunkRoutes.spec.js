var co = require("co");
var testHelpers = require("./testHelpers.js");
var request = testHelpers.request;

describe("Chunks administration", function () {

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	describe("Home of chunk admin", function () {

		beforeEach(function (done) {
			co(function * () {
				yield [
					testHelpers.chunks.insert({name: "Chunk1", content : "Some content"}),
					testHelpers.chunks.insert({name: "Chunk2", content : "Some content more"}),
					testHelpers.chunks.insert({name: "Chunk3", content : "Some last content"}),
				];
			})(done);
		})

		it("presents a list of all the chunks in the system", function (done) {
			request
				.get("/")
				.expect("Content-Type", /html/)
				.expect(/Chunk1/)
				.expect(/Chunk2/)
				.expect(/Chunk3/)
      			.expect(200)
				.end(done);
		});

		it("has a link to add new chunks", function (done) {
			request
				.get("/")
      			.expect(/<a href=\"\/chunk\/new\"/)
				.end(done);
		});

		it("each chunk has an Edit link", function (done) {
			request
				.get("/")
  				.expect(/<a href=\"\/chunk\/Chunk1\"/)
  				.expect(/<a href=\"\/chunk\/Chunk2\"/)
  				.expect(/<a href=\"\/chunk\/Chunk3\"/)
				.end(done);
		});
	});

	describe("Addning new chunk", function () {
		var testChunkForm  = {};

		beforeEach(function (done) {
			testChunkForm = {
				name : "chunkName",
				content : "some content"
			};
			done();
		});

		it("has a nice form for adding chunks", function (done) {
			request
				.get("/chunk/new")
				.expect("Content-Type", /html/)
      			.expect(200)
      			.expect(/action=\"\/chunk\/new\" method=\"post\"/)
				.end(done);
		});

		it("add a chunk with all fields set", function (done) {
			request
				.post("/chunk/new")
				.send(testChunkForm)
				.expect(201)
				.expect("location", "/chunk/" + testChunkForm.name)
				.end(done);
		});
		it("requires a name", function (done) {
			delete testChunkForm.name;

			request
				.post("/chunk/new")
				.send(testChunkForm)
				.expect(400)
				.expect("ErrorMessage", "Name is required")
				.end(done);
		});
		it("requires a name without spaces", function (done) {
			testChunkForm.name = "a name with spaces";

			request
				.post("/chunk/new")
				.send(testChunkForm)
				.expect(400)
				.expect("ErrorMessage", "Name cannot contain spaces")
				.end(done);
		});
		it("requires a unique name", function (done) {
			co(function *() {
				yield testHelpers.chunks.insert({name: "NotUnique", content : "Some content"}),

				testChunkForm.name = "NotUnique";

				request
					.post("/chunk/new")
					.send(testChunkForm)
					.expect(400)
					.expect("ErrorMessage", "Name must be unique. 'NotUnique' is already used")
					.end(done);
			})();
		});
	});

	describe("Update existing chunk", function () {
		var testChunk = {};
		var chunkName  = "testChunkName";
		var updateURL = "/chunk/" + chunkName;

		beforeEach(function (done) {
			co(function *() {
				testChunk =
					{
						name: chunkName,
						content : "Some content",
						created_by : "Marcus",
						created_at : new Date("2014/05/31"),
						updated_at : new Date("2014/06/01")
					};

				yield testHelpers.chunks.insert(testChunk);
			})(done);
		});

		it("has a nice form for editing chunks", function (done) {
			request
				.get(updateURL)
				.expect("Content-Type", /html/)
      			.expect(200)
      			.expect(/action=\"\/chunk\/testChunkName\" method=\"put\"/)
      			.expect(/Marcus/)
      			.expect(/Some content/)
      			.expect(/Sat May 31 2014/)
      			.expect(/Sun Jun 01 2014/)
				.end(done);
		});

		it("updates a chunk with all fields set correctly", function (done) {
			request
				.put(updateURL)
				.send(testChunk)
				.expect(204)
				.expect("location", updateURL)
				.end(done);
		});

		it("requires a name", function (done) {
			delete testChunk.name;

			request
				.put(updateURL)
				.send(testChunk)
				.expect(400)
				.expect("ErrorMessage", "Name is required")
				.end(done);
		});

		it("requires name without spaces", function (done) {
			testChunk.name = "Name With Spaces";

			request
				.put(updateURL)
				.send(testChunk)
				.expect(400)
				.expect("ErrorMessage", "Name cannot contain spaces")
				.end(done);
		});

		// TODO: Not sure about the validation here...
		// It should not allow a name that is already existing
		// unless it is the own name...
		// it("requires unique name", function (done) {
		// 	co(function *() {
		// 		yield testHelpers.chunks.insert({name: "NotUnique", content : "Some content"}),

		// 		testChunk.name = "NotUnique";

		// 		request
		// 			.put(updateURL)
		// 			.send(testChunk)
		// 			.expect(400)
		// 			.expect("ErrorMessage", "Name must be unique. 'NotUnique' is already used")
		// 			.end(done);
		// 	})();
		// });
	});

	describe("Delete existing chunk", function () {
		var testChunk = {};

		beforeEach(function (done) {
			co(function *() {
				testChunk =
					{
						name: "chunkName",
						content : "Some content"
					};

				yield testHelpers.chunks.insert(testChunk);
			})(done);
		});

		it("deletes an existing chunk", function (done) {
			request
				.get("/chunk/" + testChunk.name + "/delete")
				.expect(204)
				.expect("location", "/")
				.end(done);
		});
	});
});