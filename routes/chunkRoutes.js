var render = require("../lib/render.js");
var config = require("../config")();
var dbWrap = require("../lib/dbWrap.js");
var chunkCollection = dbWrap.getCollection(config.mongoUrl, "chunks");

module.exports.list = function *() {
	var chunkList = yield chunkCollection.find({});
	this.body = yield render("chunk_home.html", { chunks : chunkList });
};

module.exports.showAdd = function *() {
	this.body = yield render("chunk_add.html");
};