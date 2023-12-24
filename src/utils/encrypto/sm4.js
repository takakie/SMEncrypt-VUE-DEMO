//import { SM4 } from 'gm-crypto';
const { SM4, SM2 } = require('gm-crypto');

let SM4Data = {
    key: '',
    iv: '',
    originalData: '',
    encryptedData: '',
    decryptedData: ''
}


function generateSM4KeyPair (SM4Data) {
  let SM2Pair =  SM2.generateKeyPair()
  SM4Data.key = SM2Pair.privateKey.substring(0, 32)
  SM4Data.iv = SM2Pair.privateKey.substring(32, 64)
  return SM4Data
}


function encryptSM4 (SM4Data) {

    // ECB
    // SM4Data.encryptedData = SM4.encrypt(SM4Data.originalData, SM4Data.key, {
    //   inputEncoding: 'utf8',
    //   outputEncoding: 'base64'
    // })
    
    //CBC
    
    SM4Data.encryptedData = SM4.encrypt(SM4Data.originalData, SM4Data.key, {
      iv: SM4Data.iv,
      mode: SM4.constants.CBC,
      inputEncoding: 'utf8',
      outputEncoding: 'base64'
    })
  }
//解密
function decryptSM4 (SM4Data) {
    // ECB
    // SM4Data.decryptedData = SM4.decrypt(SM4Data.encryptedData, key, {
    //   inputEncoding: 'base64',
    //   outputEncoding: 'utf8'
    // })
    //CBC
    SM4Data.decryptedData = SM4.decrypt(SM4Data.encryptedData, SM4Data.key, {
      iv: SM4Data.iv,
      mode: SM4.constants.CBC,
      inputEncoding: 'base64',
      outputEncoding: 'utf8'
    })
}


module.exports = {
  generateSM4KeyPair,
  decryptSM4,
  encryptSM4,
  SM4Data
};