const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chainRepr: "",
  length: 0,
  getLength() {
    return this.length;
  },
  addLink(value) {
    this.length++;

    if (this.length == 0) {
      this.chainRepr += `( ${value} )~~`;
    } else {
      this.chainRepr += `( ${value} )~~`;
    }

    return this;
  },
  removeLink(position) {
    if (position < 1 || position > this.length || typeof position != "number") {
      this.restartChain();
      throw "Error";
    }

    if (this.length == 1) {
      this.chainRepr = "";
      return this;
    }

    let splittedChain = this.chainRepr.split("~~");
    splittedChain.splice(position - 1, 1);
    this.chainRepr = splittedChain.join("~~");

    return this;
  },
  reverseChain() {
    let splittedChain = this.chainRepr.split("~~").reverse();
    splittedChain.shift();
    splittedChain.push("");
    this.chainRepr = splittedChain.join("~~");
    return this;
  },
  finishChain() {
    this.chainRepr = this.chainRepr.substring(0, this.chainRepr.length - 2);
    let returnChain = this.chainRepr;
    this.restartChain();
    return returnChain;
  },
  restartChain() {
    this.chainRepr = "";
    this.length = 0;
  },
};

module.exports = chainMaker;
