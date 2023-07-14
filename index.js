require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const storage = require("./storage");

app.get("/", (req, res) => {
  storageList = storage.getList();
  res.send(storageList);
});

app.listen(port, () => {
  console.log("server started on port " + port);
});
