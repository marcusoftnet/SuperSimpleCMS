var co = require("co");
var config = require("../config")("local");
var dbWrap = require("../lib/dbWrap.js");
var chunks = dbWrap.getCollection(config.mongoUrl, "chunks");
module.exports.chunks = chunks;

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield chunks.remove({});
	})(done);
};

var app = require("../app.js");
module.exports.request = require("supertest").agent(app.listen());

module.exports.testUser = config.user;