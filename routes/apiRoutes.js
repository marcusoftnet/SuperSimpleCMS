var parse = require("co-body");
var config = require("../config")();
var dbWrap = require("../lib/dbWrap.js");
var chunkCollection = dbWrap.getCollection(config.mongoUrl, "chunks");

module.exports.getChunk = function *(name) {
	this.body = yield chunkCollection.find({name : name});
	this.status = 200;
};