const fs = require("fs");
const path = require("path");
const storagePath = process.env.STORAGE_PATH
  ? process.env.STORAGE_PATH
  : "./storage_folder";

get = (pathname = "") => {
  serverPath = path.join(storagePath, pathname);
  // if it doesn't exist, then return
  if (!isExist(serverPath)) {
    return undefined;
  }

  // if it is file, then get the name and download link
  if (isFile(serverPath)) {
    return {
      isFile: true,
      serverPath: serverPath,
    };
  }

  // if it is directory, then get all of the files and folders inside
  else {
    return {
      isFile: false,
      listing: getList(serverPath),
    };
  }
};

getList = (pathname = "") => {
  if (!isExist(pathname)) {
    return [];
  }

  fs_data = fs.readdirSync(pathname, { withFileTypes: true });
  listing = fs_data.map((dirent) => ({
    name: dirent.name,
    isFile: dirent.isFile(),
  }));
  return listing;
};

initMount = () => {
  if (!isExist(storagePath)) {
    fs.mkdirSync(storagePath);
  }
};

mkdirIfNotExist = (pathname) => {
  // if  same name already exist
  if (isExist(pathname)) {
    // if same name and its folder
    if (!isFile(pathname)) {
      return;
    }
  }

  // if folder doesn't exist then create it
  fs.mkdirSync(pathname);
};

isExist = (pathname = "") => {
  if (fs.existsSync(pathname)) {
    return true;
  } else {
    return false;
  }
};

isFile = (pathname = "") => {
  filestat = fs.statSync(pathname);
  return filestat.isFile();
};

module.exports = {
  get: get,
  initMount: initMount,
  storagePath: storagePath,
  mkdirIfNotExist: mkdirIfNotExist,
};
