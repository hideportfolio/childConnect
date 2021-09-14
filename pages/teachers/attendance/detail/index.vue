<template>
  <div>
    <p>This is attendance page.</p>
    <p>{{ attendance }}</p>
    <input v-model="replay" placeholder="返信">
    <button @click="postReplay()">Replay</button>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getAttendance } from '~/graphql/queries'
import { createThread } from '~/graphql/mutations'

export default {
  middleware: 'auth',
  data () {
    return {
      attendance: {},
      replay: ''
    }
  },
  async created () {
    await this.getAttendance()
  },
  methods: {
    async postReplay () {
      const auth = await Auth.currentUserInfo()
      const res = await API.graphql(graphqlOperation(createThread, {
        input: {
          attendanceId: this.attendance.id,
          userId: auth.username,
          contents: this.replay,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }))
      console.log(res)
      this.replay = ''
    },
    async getAttendance () {
      const res = await API.graphql(graphqlOperation(getAttendance, {
        userId: this.$route.query.user,
        date: this.$route.query.date
      }))
      this.attendance = res.data.getAttendance
    }
  }
}
</script>
