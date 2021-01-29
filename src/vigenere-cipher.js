const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8,
      J: 9,
      K: 10,
      L: 11,
      M: 12,
      N: 13,
      O: 14,
      P: 15,
      Q: 16,
      R: 17,
      S: 18,
      T: 19,
      U: 20,
      V: 21,
      W: 22,
      X: 23,
      Y: 24,
      Z: 25,
    };
  }
  encrypt(message, key) {
    if (!message || !key) throw "Error";

    key = this.equalizeLength(message, key).toUpperCase();
    message = message.toUpperCase();

    let encryptedMessage = this.cryptoAlgo(
      message,
      key,
      function (i, j, str, key) {
        let numberOfLetter =
          (this.alphabet[str[i]] + this.alphabet[key[j]]) % 26;
        let entrieToNumberOfLetter = Object.entries(this.alphabet).find(
          (value) => value[1] === numberOfLetter
        );
        return entrieToNumberOfLetter[0];
      }
    );

    return encryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw "Error";

    key = this.equalizeLength(encryptedMessage, key).toUpperCase();
    encryptedMessage = encryptedMessage.toUpperCase();

    let decryptedMessage = this.cryptoAlgo(
      encryptedMessage,
      key,
      function (i, j, str, key) {
        let numberOfLetter =
          (this.alphabet[str[i]] - this.alphabet[key[j]] + 26) % 26;
        let entrieToNumberOfLetter = Object.entries(this.alphabet).find(
          (value) => value[1] === numberOfLetter
        );
        return entrieToNumberOfLetter[0];
      }
    );

    return decryptedMessage;
  }

  cryptoAlgo(str, key, solvingFunction) {
    let originalMessage = "";

    for (let i = 0, j = 0; i < str.length; i++, j++) {
      if (this.alphabet[str[i]] == undefined) {
        originalMessage += str[i];
        j--;
      } else {
        let letter = solvingFunction.call(this, i, j, str, key);
        originalMessage += letter;
      }
    }
    if (this.isDirect) return originalMessage;
    return originalMessage.split("").reverse().join("");
  }

  equalizeLength(str, key) {
    let strLength = str.split(" ").join("").length;
    if (key.length >= strLength) return key;
    for (let i = 0; i < key.length; i++) {
      if (strLength == key.length) return key;
      key += key[i];
    }
  }
}

module.exports = VigenereCipheringMachine;
