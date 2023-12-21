import { SM4 } from 'gm-crypto';

let SM4Data = {
    key: 'am9RSmx1T2NiWWQ0cWo3SQ==',
    iv: 'ckJtNGZPcnFvcjNqcVdidw==',
    originalData: 'admin123',
    encryptedData: '',
    decryptedData: ''
}

let bufferKey = Buffer.from(SM4Data.key, "base64")
let bufferIv = Buffer.from(SM4Data.iv, "base64")
SM4Data.key = bufferKey.toString('hex')
SM4Data.iv = bufferIv.toString('hex')

const encryptSM4 = () => {

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
const decryptedSM4 = () => {
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
  
encryptSM4()
decryptedSM4()
console.log(SM4Data)
