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

	var unique = yield nameUnique(chunk.name);
	if(!unique){
		var message = "Name must be unique. '" + chunk.name + "' is already used";
		this.set("ErrorMessage", message);
		this.status = 400;
		return;
	}

	yield chunkCollection.insert(chunk);

	this.set("location", "/chunk/" + chunk.name);
	this.status = 201;
};

module.exports.get = function *(name) {
	var c = yield chunkCollection.findOne({name:name});
	this.body = yield render("chunk_edit.html", {chunk : c});
};

function hasSpaces (s) {
	return s.split(" ").length > 1;
}

function *nameUnique(name){
	var numberOfOccurances = yield chunkCollection.count({ name: name });
	return numberOfOccurances === 0;
};