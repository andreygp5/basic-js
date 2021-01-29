const { resetHistory } = require("sinon");
const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  constructor() {
    this.depth = 0;
    this.allDepths = [];
  }
  calculateDepth(arr) {
    this.depth++;

    for (let element of arr) {
      if (Object.getPrototypeOf(element) === Object.getPrototypeOf([])) {
        this.calculateDepth(element);
      }
    }

    this.allDepths.push(this.depth);
    let maxDepth = Math.max(...this.allDepths);
    this.depth--;

    if (this.depth == 0) {
      this.allDepths = [];
      return maxDepth;
    }

    return Math.max(...this.allDepths);
  }
};
