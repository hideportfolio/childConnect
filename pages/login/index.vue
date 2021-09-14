<template>
  <div class="card">
    <div class="form">
      <h1>ログイン</h1>
      <div class="container">
        <p>ID</p>
        <input class="ID" v-model="loginid" placeholder="" />
      </div>
      <div class="container">
        <p>Password</p>
        <input class="pass" v-model="loginpw" placeholder="" />
      </div>
      <br />
      <br />
    </div>
    <button class="submit" @click="login()">ログイン</button>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  layout: 'default',
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
        await res.completeNewPasswordChallenge(
          this.loginpw,
          {},
          { onSuccess () {}, onFailure () {} }
        )
      }
      await this.$store.dispatch('user/getProfile')
      if (this.$store.getters['user/profile'].type === 'PARENT') {
        this.$router.push('/parents/attendance')
      } else if (this.$store.getters['user/profile'].type === 'TEACHER') {
        this.$router.push('/teachers/attendance/list')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
template,
h1,
p,
form,
input {
  margin: 0;
}
form {
  margin: 0 auto;
  text-align: center;
}
.form p {
  text-align: left;
  width: 90%;
  max-width: 300px;
  font-size: 15px;
  color: #825959;
}
.form-title {
  text-align: center;
}
.container {
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
}
.ID,
.pass {
  width: 100%;
  height: 30px;
  max-width: 300px;
  border: 1px #825959 solid;
  border-radius: 5px;
}
.submit {
  text-align: center;
  margin: 0 auto;
}
</style>
