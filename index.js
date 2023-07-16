require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Cors allow
app.use(cors());

// Mount storage
const storage = require("./storage");
storage.initMount();
const multer = require("multer");
// Setting storage engine for upload
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    folderpath = req.params["0"];
    newDestination = path.join(storage.storagePath, folderpath);
    storage.mkdirIfNotExist(newDestination);
    cb(null, newDestination);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: uploadStorage });

app.post("/upload/*", upload.array("file"), (req, res) => {
  res.status(200).send("Files successfully uploaded");
});

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
  console.log("express-storage-api started on port " + port);
});
