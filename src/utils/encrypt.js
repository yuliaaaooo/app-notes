const {AES} = require('crypto-js');

function encrypt(password){
    return AES.encrypt(password, 'cms').toString()
}

module.exports = {
    encrypt
}