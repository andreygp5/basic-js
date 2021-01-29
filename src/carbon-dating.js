const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  console.log(sampleActivity);
  if (
    typeof sampleActivity !== "string" ||
    !Number(sampleActivity) ||
    sampleActivity > 15 ||
    sampleActivity <= 0
  )
    return false;
  let k = Math.LN2 / HALF_LIFE_PERIOD;
  let t = Math.log(MODERN_ACTIVITY / sampleActivity) / k;
  return Math.ceil(t);
};
