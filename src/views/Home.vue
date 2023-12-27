<template>
  <body id="poster">
    <el-form class="home-container" label-position="left" label-width="0px">
      <h3 class="home_title">
        已认证
        <el-button @click="toGetApiTest()">点击获取邮件</el-button>
      </h3>
      <el-form-item label="">
        <el-input type="text" v-model="homeForm.nickName" autocomplete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="text" v-model="tempPhomeNumber" autocomplete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="label" v-model="email" autocomplete="off" placeholder="点击获取显示邮件" readonly></el-input>
      </el-form-item>
      <!-- <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 100%;background: #505458;border: none;" @click="toLogin">登陆</el-button>
      </el-form-item> -->
    </el-form>
  </body>
</template>

<script>
import { encryptSM4, decryptSM4, SM4Data } from '@/utils/encrypto/sm4'

export default {
  name: 'Home',
  data() {
      return {
        homeForm: {
          nickName: "",
          phoneNumber: ""
        },
        tempPhomeNumber: "",
        email: ""
      }
    },
    methods: {
      toGetApiTest() {
        this.homeForm.phoneNumber = this.tempPhomeNumber
        SM4Data.key = sessionStorage.getItem("secretKey")
        SM4Data.iv = sessionStorage.getItem("iv")
        SM4Data.originalData = this.homeForm.phoneNumber
        encryptSM4(SM4Data)
        this.homeForm.phoneNumber = SM4Data.encryptedData

        this.axios.get('/getApiTest', { params: this.homeForm }).then((resp) =>{
          let data = resp.data;
          if(data.code==200){
            SM4Data.encryptedData = data.data.email
            decryptSM4(SM4Data)
            this.email = SM4Data.decryptedData
            this.$message({
              message: data.msg,
              type:'success'
            });
          } else{
            this.$message({
              message: data.msg,
              type:'error'
            });
          }
        })
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
.home-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.home_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458; 
}
</style>
