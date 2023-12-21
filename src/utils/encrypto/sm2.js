import { SM2 } from 'gm-crypto';


// let SM2Data = {
//     publicKey: "048421649b6acdd22bc5075ef937dd35bb165b1db32eb4bd2fc666f07808819c88ac7dbeaeeb367bfe53601db55372bc16bf284dbf12f6b5f0df111023df88a4b0",
//     privateKey: "24382886faa9bf81d88e498179ac4edb7dac174b41bb41903841daecae4d996d",
//     originalData: 'admin123',
//     encryptedData: '',
//     decryptedData: ''
//   }
  let SM2Pair =  SM2.generateKeyPair()
  console.log(SM2Pair)

  let SM2Data = {
    publicKey: "043059301306072a8648ce3d020106082a811ccf5501822d0342000456c581d0e1849089901f8f12f5810aadca2755b174d05ed9a302c92e457feda52aa9e7d03a628c82acb834bd51c6578f67fb9e9ad16c680eee155d239371d821",
    privateKey: "308193020100301306072a8648ce3d020106082a811ccf5501822d04793077020101042039c0d7fa2afe0c8e560d8234feb04373a97119b840c858c80c6b4a264947ae67a00a06082a811ccf5501822da1440342000456c581d0e1849089901f8f12f5810aadca2755b174d05ed9a302c92e457feda52aa9e7d03a628c82acb834bd51c6578f67fb9e9ad16c680eee155d239371d821",
    originalData: 'admin123',
    encryptedData: '',
    decryptedData: ''
  }
   
  //加密
  const encryptSM2 = () => {
    SM2Data.encryptedData = SM2.encrypt(SM2Data.originalData, SM2Data.publicKey, {
      inputEncoding: 'utf8',
      outputEncoding: 'base64'
    })
  }
   
  //解密
  const decryptedSM2 = () => {
    SM2Data.decryptedData = SM2.decrypt(SM2Data.encryptedData, SM2Data.privateKey, {
      inputEncoding: 'base64',
      outputEncoding: 'utf8'
    })
  }

  encryptSM2()
  decryptedSM2()
  console.log(SM2Data)