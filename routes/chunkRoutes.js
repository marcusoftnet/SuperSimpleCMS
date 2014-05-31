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

	var message = yield getValidationMessage(chunk, 0);
	if(message.length > 0){
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

module.exports.update = function *(name) {
	var chunk = yield chunkCollection.findOne({name:name});
	var parsedChunkForm = yield parse(this);

	var message = yield getValidationMessage(parsedChunkForm, 1);
	if(message.length > 0){
		this.set("ErrorMessage", message);
		this.status = 400;
		return;
	}

	yield chunkCollection.updateById(chunk._id, parsedChunkForm);

	this.status = 204;
	this.set("location", "/chunk/" + chunk.name);
};

module.exports.del = function *(name) {
	yield chunkCollection.remove({name : name});

	this.status = 204;
	this.set("location", "/");
}

function *getValidationMessage(chunk, expectedNoOfChunksWithName) {
	if(!chunk.name){
		return "Name is required";
	}

	if(hasSpaces(chunk.name)){
		return "Name cannot contain spaces";
	}

	var noOfNames = yield numberOfOccurances(chunk.name);
	if(noOfNames > expectedNoOfChunksWithName){
		return "Name must be unique. '" + chunk.name + "' is already used";
	}

	return "";
};

function hasSpaces (s) {
	return s.split(" ").length > 1;
}

function *numberOfOccurances(name){
	return yield chunkCollection.count({ name: name });
};