const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Replace with your mongoLab URI
const MONGO_URI =
  "mongodb://asit:12345@lyricaldb-shard-00-00-oe0rt.mongodb.net:27017,lyricaldb-shard-00-01-oe0rt.mongodb.net:27017,lyricaldb-shard-00-02-oe0rt.mongodb.net:27017/test?ssl=true&replicaSet=lyricaldb-shard-0&authSource=admin&retryWrites=true";
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
