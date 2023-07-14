const fs = require("fs");
const storage_path = process.env.STORAGE_PATH
  ? process.env.STORAGE_PATH
  : "./storage_folder";

getList = () => {
  if (!isExist(storage_path)) {
    return [];
  }
  return fs.readdirSync(storage_path);
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
