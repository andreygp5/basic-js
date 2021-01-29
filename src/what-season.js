const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {
  if (!date) return "Unable to determine the time of year!";
  try {
    date.getTime();
  } catch (error) {
    throw "Fake date";
  }
  let monthIndex = date.getMonth();
  if (monthIndex < 2 || monthIndex == 11) return "winter";
  if (monthIndex < 5) return "spring";
  if (monthIndex < 8) return "summer";
  if (monthIndex < 11) return "autumn";
};
