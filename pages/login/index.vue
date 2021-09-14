<template>
  <div class = "form">
    <h1>ログイン</h1>
    <form action="post">
      <div class="container">
        <p>ID</p>
        <input class="ID" v-model="loginid" placeholder="">
      </div>
      <div class="container">
        <p>Password</p>
        <input class="pass" v-model="loginpw" placeholder="">
      </div>
      <br>
      <br>
      <div class="submit"><button @click="login()">ログイン</button></div>
    </form>
  </div>
</template>

<style>
  template,h1,p,form,input{margin:0}
  form{    
    margin:0 auto;
    text-align: center;    
  }
  .form p{    
    text-align:left;
    width:250px;
    font-size: 20px;
  }
  .form-title{
    text-align: center;
  }
  .container {
    width:250px;
    margin:0 auto;
  }
  .ID, .pass{
    width:250px;
  }
  .submit{
    text-align: center;
  }
</style>

<script>
import { Auth } from 'aws-amplify'

export default {
  data () {
    return {
      valid: false,
      loginid: '',
      loginpw: ''
    }
  },
  methods: {
    async login () {
      const res = await Auth.signIn(this.loginid, this.loginpw)
      if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await res.completeNewPasswordChallenge(this.loginpw, {}, { onSuccess () {}, onFailure () {} })
      }
      this.$router.push('/')
    }
  }
}
</script>
