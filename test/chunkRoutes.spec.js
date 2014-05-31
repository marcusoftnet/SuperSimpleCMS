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
		it("has a nice form for adding", function (done) {
			request
				.get("/chunk/new")
				.expect("Content-Type", /html/)
      			.expect(200)
      			.expect(/action=\"\/chunk\/new\"/)
				.end(done);
		});
		it("accepts a chunk with all fields set");
		it("requires a name");
	})
});