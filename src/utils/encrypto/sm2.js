//import { SM2 } from 'gm-crypto';
const { SM2 } = require('gm-crypto');

var Buffer = require('buffer/').Buffer


//前端生成密钥
// let SM2Pair =  SM2.generateKeyPair()
// console.log(SM2Pair)

let SM2Data = {
  publicKey: '',
  privateKey: '',
  originalData: '',
  encryptedData: '',
  decryptedData: ''
}

//加密
function encryptSM2(Data, publicKey) {
  let ciper = SM2.encrypt(Data, publicKey, {
    inputEncoding: 'utf8',
    outputEncoding: 'hex'
  })
  return ciper
}

// const encryptSM2 = () => {
//   SM2Data.encryptedData = SM2.encrypt(SM2Data.originalData, SM2Data.publicKey, {
//     inputEncoding: 'utf8',
//     outputEncoding: 'base64'
//   })
// }
  
//解密
function decryptSM2(ciper, privateKey) {
  //与后端加密同步
  if (ciper.startsWith(SM2.constants.PC)) {
    ciper = ciper.substring(2);
  }
  let Data = SM2.decrypt(ciper, privateKey, {
    inputEncoding: 'hex',
    outputEncoding: 'utf8'
  })
  return Data
}

// const decryptedSM2 = () => {
//   SM2Data.decryptedData = SM2.decrypt(SM2Data.encryptedData, SM2Data.privateKey, {
//     inputEncoding: 'base64',
//     outputEncoding: 'utf8'
//   })
// }
// SM2Data.encryptedData = encryptSM2(SM2Data.originalData ,SM2Data.publicKey )
// console.log(SM2Data)

module.exports = {
  decryptSM2,
  encryptSM2,
  SM2Data
};