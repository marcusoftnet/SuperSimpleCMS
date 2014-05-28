var koa = require("koa");
var app = module.exports = koa();

app.use(function * () {
	this.body = "Hello";
});

// fire up
app.listen(3000);
console.log("The app is listening. Port 3000");