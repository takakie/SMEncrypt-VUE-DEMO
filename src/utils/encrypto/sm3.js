import { SM3 } from 'gm-crypto';

let SM3Data = {
    originalData: 'admin123',
    encryptedData: ''
}
   
  //加密
  const encryptSM3 = () => {
    // SM3Data.encryptedData = SM3.digest(SM3Data.originalData)
    // SM3Data.encryptedData = SM3.digest(SM3Data.originalData, 'base64')
    SM3Data.encryptedData = SM3.digest(SM3Data.originalData, 'utf8', 'base64')
    
  }
  
  encryptSM3();
  console.log(SM3Data)