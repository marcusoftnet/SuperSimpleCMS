var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");

// middleware

// routes
// chunks admin
var chunkRoutes = require("./routes/chunkRoutes.js");
app.use(routes.get("/", chunkRoutes.list));
app.use(routes.get("/chunk/new", chunkRoutes.showAdd));
app.use(routes.post("/chunk/new", chunkRoutes.add));
app.use(routes.get("/chunk/:name", chunkRoutes.get));
app.use(routes.put("/chunk/:name", chunkRoutes.update));
app.use(routes.del("/chunk/:name", chunkRoutes.del));


// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);