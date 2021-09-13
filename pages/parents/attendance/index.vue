<template>
  <div>
    <p>This is attendance page.</p>
    <button @click="postAttendace()">login</button>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createAttendance } from '~/graphql/mutations'

export default {
  middleware: 'auth',
  data () {
    return {
      attendance: 'ATTEND',
      attendanceType: [
        'ATTEND',
        'ABUSENT'
      ]
    }
  },
  methods: {
    async postAttendace () {
      const auth = await Auth.currentUserInfo()
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)) // Timezone Tokyo
      const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
      const res = await API.graphql(graphqlOperation(createAttendance, {
        input: {
          school: 'school',
          userId: auth.username,
          date,
          attendance: this.attendance,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }))
      console.log(res)
    }
  }
}
</script>
