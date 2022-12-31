const { AES } = require("crypto-js");
// import { AES } from 'crypto-js';

function encrypt(password) {
  return AES.encrypt(password, "cms").toString();
}

module.exports = {
  encrypt,
};

// export {
//     encrypt
// }
