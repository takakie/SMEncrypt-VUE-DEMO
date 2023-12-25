<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">
        系统登陆
        <el-button @click="toRegister()">点我注册</el-button>
      </h3>
      <el-form-item label="">
        <el-input type="text" v-model="loginForm.userName" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="password" v-model="tempPassword" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 100%;background: #505458;border: none;" @click="toLogin">登陆</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { encryptSM2 } from '@/utils/encrypto/sm2'
import { generateSM4KeyPair, SM4Data } from '@/utils/encrypto/sm4'


export default {
  name: 'Login',
  data() {
      return {
        loginForm: {
          userName: '',
          password: '',
          secretKey: '',
          iv: ''
        },
        tempPassword: ''
      }
    },
  mounted() {
    this.axios.get('/getPublicKey').then((resp) =>{
        let data = resp.data;
        if(data.code==200){
          sessionStorage.setItem('publicKey', data.data.publicKey);
        } else{
          this.$message({
            message: "获取公钥失败",
            type:'error'
          });
        }
      }).catch(error => {
        // 处理错误...
    });
  },
  methods: {

    toLogin() {
      //数据加密
      this.loginForm.password = this.tempPassword
      this.tempPassword = ""
      let publicKey = sessionStorage.getItem("publicKey")
      if(publicKey != null){
        this.loginForm.password = encryptSM2(this.loginForm.password, publicKey)
        SM4Data = generateSM4KeyPair(SM4Data)
        sessionStorage.setItem('secretKey', SM4Data.key)
        sessionStorage.setItem('iv', SM4Data.iv)
        this.loginForm.secretKey = encryptSM2(SM4Data.key, publicKey)
        this.loginForm.iv = encryptSM2(SM4Data.iv, publicKey)
        //生成SM4密钥并加密
      } else {
        this.$message({
            message: '请刷新以重新获取公钥',
            type:'error'
          });
        return
      }
      
      
      //登陆请求
      this.axios.post('/user/login', this.loginForm).then((resp) =>{
        let data = resp.data;
        if(data.code==200){
          this.loginForm = data.data;
          sessionStorage.setItem('token', data.data.token)
          console.log(data.data)
          this.$message({
            message: '登陆成功',
            type:'success'
          });
          this.$router.push({path:'/Home'})
        } else{
          sessionStorage.removeItem('secretKey')
          sessionStorage.removeItem('iv')
          this.$message({
            message: '登陆失败',
            type:'error'
          });
        }
      }).catch(error => {
      // 处理错误...
    });

    },
    toRegister() {
      this.$router.push({path:'/Register'})
      console.log('toRegister!');
    }
  }
}
</script>


<style>
#poster{
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: 0px;
  padding: 0px;
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458; 
}
</style>
