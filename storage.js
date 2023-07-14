const fs = require("fs");
const path = require("path");
const storage_path = process.env.STORAGE_PATH
  ? process.env.STORAGE_PATH
  : "./storage_folder";

getList = (pathname = "") => {
  server_path = path.join(storage_path, pathname);
  if (!isExist()) {
    return [];
  }

  fs_data = fs.readdirSync(server_path, { withFileTypes: true });
  listing = fs_data.map((dirent) => ({
    name: dirent.name,
    isFile: dirent.isFile(),
  }));
  return listing;
};

initMount = () => {
  if (!isExist()) {
    fs.mkdirSync(storage_path);
  }
};

isExist = (pathname = "") => {
  server_path = path.join(storage_path, pathname);
  if (fs.existsSync(server_path)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getList: getList, initMount: initMount };
