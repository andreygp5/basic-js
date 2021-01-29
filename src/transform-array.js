const CustomError = require("../extensions/custom-error");

module.exports = function transform(initialArr) {
  if (!(initialArr.__proto__ == Array.prototype)) throw "Error";

  let modifiedArr = [];

  for (let i = 0; i < initialArr.length; i++) {
    if (
      (initialArr[i] == "--double-prev" && i == 0) ||
      (initialArr[i] == "--discard-prev" && i == 0) ||
      (initialArr[i] == "--double-next" && i == initialArr.length - 1) ||
      (initialArr[i] == "--discard-next" && i == initialArr.length - 1)
    ) {
      continue;
    }

    switch (initialArr[i]) {
      case "--discard-next":
        if (initialArr[i + 2] != "--double-prev") {
          i += 1;
        } else {
          i += 2;
        }
        break;

      case "--discard-prev":
        if (initialArr[i - 2] != "--discard-next") {
          modifiedArr.pop();
        }
        break;

      case "--double-next":
        modifiedArr.push(initialArr[i + 1]);
        break;

      case "--double-prev":
        if (initialArr[i - 2] != "--discard-next") {
          modifiedArr.push(initialArr[i - 1]);
        }
        break;

      default:
        modifiedArr.push(initialArr[i]);
        break;
    }
  }
  return modifiedArr;
};
