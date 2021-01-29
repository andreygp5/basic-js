const CustomError = require("../extensions/custom-error");

module.exports = function repeater(
  str,
  {
    repeatTimes,
    separator = "+",
    addition,
    additionRepeatTimes,
    additionSeparator = "|",
  }
) {
  str = String(str);
  let strBase = str;

  if (addition !== undefined) {
    addition = String(addition);
    let additionBase = addition;
    for (let i = 1; i < additionRepeatTimes; i++) {
      addition += additionSeparator + additionBase;
    }
    str = String(str) + addition;
    strBase = str;
  }

  for (let i = 1; i < repeatTimes; i++) {
    str += separator + strBase;
  }

  return str;
};
