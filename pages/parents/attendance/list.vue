<template>
  <div>
    <p>{{ user }}の出席一覧</p>
    <p>{{ attendances }}</p>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { AttendancesByUser } from '~/graphql/queries'

export default {
  data () {
    return {
      attendances: [],
      user: undefined
    }
  },
  created () {
    this.setUser()
  },
  methods: {
    async setUser () {
      const auth = await Auth.currentUserInfo()
      this.user = auth
    },
    async listAttendances () {
      const auth = await Auth.currentUserInfo()
      const res = await API.graphql(graphqlOperation(AttendancesByUser, {
        userId: auth.username
      }))
      this.attendances = res.data.AttendancesByDate
    }
  }
}
</script>
