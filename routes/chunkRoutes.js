var render = require("../lib/render.js");
var config = require("../config")();
var dbWrap = require("../lib/dbWrap.js");
var chunks = dbWrap.getCollection(config.mongoUrl, "chunks");

module.exports.list = function *() {
	var chunkList = yield chunks.find({});
	this.body = yield render("chunk_home.html", chunkList);
};