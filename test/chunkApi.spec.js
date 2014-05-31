var co = require("co");
var testHelpers = require("./testHelpers.js");
var request = testHelpers.request;

describe("Chunks public api", function () {

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	describe("get chunks", function () {

		it("returns a single chunk by name", function (done) {
			co(function *() {
				yield testHelpers.chunks.insert({name: "testChunk", content:"Some content"});

				request
					.get("/api/chunk/testChunk")
					.set("accept", "application/json")
					.expect(/testChunk/)
					.expect(/Some content/)
					.expect(200)
					.end(done);
			})();
		});
	});
});