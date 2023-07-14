require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const storage = require("./storage");
storage.initMount();

app.get("/files/*", (req, res) => {
  pathname = req.params["0"];
  pathInfo = storage.get(pathname);
  if (pathInfo == undefined) {
    // if path invalid
    return res.sendStatus(404);
  }
  if (pathInfo.isFile) {
    // download file
    res.download(pathInfo.serverPath);
  } else {
    // get folder listing
    res.send(pathInfo);
  }
});

app.listen(port, () => {
  console.log("server started on port " + port);
});
