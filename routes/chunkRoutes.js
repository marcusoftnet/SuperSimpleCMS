var parse = require("co-body");
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

module.exports.add = function *() {
	var chunk = yield parse(this);
	chunk.created_at = new Date;
	chunk.updated_at = chunk._created_at;
	chunk.created_by = "MARCUS"; // TODO: Logged in user

	if(!chunk.name){
		this.set("ErrorMessage", "Name is required");
		this.status = 400;
		return;
	}

	if(hasSpaces(chunk.name)){
		this.set("ErrorMessage", "Name cannot contain spaces");
		this.status = 400;
		return;
	}

	yield chunkCollection.insert(chunk);

	this.set("location", "/chunk/" + chunk.name);
	this.status = 201;
};

function hasSpaces (s) {
	return s.split(" ").length > 1;
}