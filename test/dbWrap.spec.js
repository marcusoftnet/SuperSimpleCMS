var should = require("should");
var dbWrap = require("../lib/dbWrap.js");
var config = require("../config")("local");

describe("DB Wrapper", function () {
	it("is a nice way of getting hold a database object", function (done) {
		var db = dbWrap.getDatabase(config.mongoUrl);
		should.exists(db);
		done();
	});
	it("is a nice way of getting hold a generator friendly collection", function (done) {
		var chunks = dbWrap.getCollection(config.mongoUrl, "chunks");
		should.exists(chunks);
		chunks.name.should.equal("chunks");
		done();
	});
});