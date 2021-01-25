const CustomError = require("../extensions/custom-error");

module.exports = function countCats(arr) {
  let catCounter = 0;
  for (let subArr of arr) {
    for (let value of subArr) {
      if (value === "^^") {
        catCounter++;
      }
    }
  }
  return catCounter;
};
