const fs = require("fs");
const storage_path = process.env.STORAGE_PATH
  ? process.env.STORAGE_PATH
  : "./storage_folder";

getList = () => {
  if (!isExist(storage_path)) {
    return [];
  }

  fs_data = fs.readdirSync(storage_path, { withFileTypes: true });
  listing = fs_data.map((dirent) => ({
    name: dirent.name,
    isFile: dirent.isFile(),
  }));
  return listing;
};

initMount = () => {
  if (!isExist(storage_path)) {
    fs.mkdirSync(storage_path);
  }
};

isExist = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getList: getList, initMount: initMount };
