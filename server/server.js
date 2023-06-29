const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require("./router/router");
const app = express();
app.use(express.json());
app.use(cors());
const url =
  "mongodb+srv://tatipassword:tatipassword@cluster0.j12sxcz.mongodb.net/mongos-Try";
mongoose.connect(url).then(() => {
  app.listen(8000, () => {
    console.log("listening on port :", 8000);
  });
});
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(routers);
