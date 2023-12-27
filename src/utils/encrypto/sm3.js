//import { SM3 } from 'gm-crypto';
const { SM3 } = require('gm-crypto');

//SM3传输签名盐，请务必和后端保持一致，也可使用随机盐
const TRANSMIT_SALT = "digest_customized_salt"
const SEPARATOR = "$"
//加密
function digestSM3 (originalData) {
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData)
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData, 'base64')
  originalData = (TRANSMIT_SALT + SEPARATOR + originalData)
  console.log("originalData: " +  originalData)
  return SM3.digest(originalData, 'utf8', 'hex')
}
  
module.exports = {
  digestSM3
};