var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");
var serve = require('koa-static');

// middleware
app.use(serve(__dirname + '/public'));

// routes
// chunks admin
var chunkRoutes = require("./routes/chunkRoutes.js");
app.use(routes.get("/", chunkRoutes.list));
app.use(routes.get("/chunk/new", chunkRoutes.showAdd));
app.use(routes.post("/chunk/new", chunkRoutes.add));
app.use(routes.get("/chunk/:name", chunkRoutes.get));
app.use(routes.put("/chunk/:name", chunkRoutes.update));
app.use(routes.get("/chunk/:name/delete", chunkRoutes.del));

// api routes
var apiRoutes = require("./routes/apiRoutes.js");
app.use(routes.get("/api/chunk/:name", apiRoutes.getChunk));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);