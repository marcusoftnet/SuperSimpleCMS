var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();

app.use(function * () {
	this.body = "Hello";
});

// fire up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);