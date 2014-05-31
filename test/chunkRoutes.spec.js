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

		it("presents a list of all the chunks in the system", function (done) {
			co(function * () {
				yield [
					testHelpers.chunks.insert({name: "Chunk1", content : "Some content"}),
					testHelpers.chunks.insert({name: "Chunk2", content : "Some content more"}),
					testHelpers.chunks.insert({name: "Chunk3", content : "Some last content"}),
				];

				request
					.get("/")
					.expect("Content-Type", /html/)
					.expect(/Chunk1/)
					.expect(/Chunk2/)
					.expect(/Chunk3/)
	      			.expect(200)
					.end(done)
			})();
		});

		it("has a link to add new chunks", function (done) {
			request
				.get("/")
      			.expect(/<a href=\"\/chunk\/new\"/)
				.end(done);
		});

		it("each chunk has an Edit link", function (done) {
			co(function * () {
				yield [
					testHelpers.chunks.insert({name: "Chunk1", content : "Some content"}),
					testHelpers.chunks.insert({name: "Chunk2", content : "Some content more"}),
					testHelpers.chunks.insert({name: "Chunk3", content : "Some last content"}),
				];

				request
					.get("/")
      				.expect(/<a href=\"\/chunk\/Chunk1\"/)
      				.expect(/<a href=\"\/chunk\/Chunk2\"/)
      				.expect(/<a href=\"\/chunk\/Chunk3\"/)
					.end(done)
			})();
		});
	});
});