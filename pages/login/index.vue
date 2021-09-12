<template>
  <div>
    <input v-model="loginid" placeholder="ID">
    <input v-model="loginpw" placeholder="Password">
    <button @click="login()">login</button>
  </div>
</template>

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
