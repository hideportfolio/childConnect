<template>
  <div>
    <p>あなたのお子さんの出席一覧</p>
    <p>{{ attendances }}</p>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { listAttendaces } from '~/graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      attendances: []
    }
  },
  created () {
    this.listAttendances()
  },
  methods: {
    async listAttendances () {
      const auth = await Auth.currentUserInfo()
      const res = await API.graphql(graphqlOperation(listAttendaces, {
        userId: auth.username
      }))
      this.attendances = res.data.listAttendaces
    }
  }
}
</script>
