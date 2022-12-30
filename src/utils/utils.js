import { AES } from 'crypto-js';

function encrypt(password){
    return AES.encrypt(password, 'cms').toString()
}

export {
    encrypt
}
