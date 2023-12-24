//import { SM3 } from 'gm-crypto';
const { SM3 } = require('gm-crypto');


//加密
function digestSM3 (originalData) {
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData)
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData, 'base64')
  return SM3.digest(originalData, 'utf8', 'hex')
}
  
module.exports = {
  digestSM3
};