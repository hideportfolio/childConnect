<template>
  <div>
    <p>This is attendance page.</p>
    <p>{{ attendance }}</p>
    <input v-model="replay" placeholder="返信">
    <button @click="postReplay()">Replay</button>
  </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { getAttendance } from '~/graphql/queries'
export default {
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
