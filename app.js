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
app.use(routes.get("/chunk/:id", chunkRoutes.get));
app.use(routes.put("/chunk/:id", chunkRoutes.update));
app.use(routes.delete("/chunk/:id", chunkRoutes.delete));


// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);