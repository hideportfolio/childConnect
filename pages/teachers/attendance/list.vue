<template>
  <div>
    <p>{{ date }}の出席一覧</p>
    <p>{{ attendances }}</p>
  </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { attendancesByDate } from '~/graphql/queries'
export default {
  data () {
    return {
      attendances: [],
      date: undefined
    }
  },
  async created () {
    this.setDate()
    await this.listAttendances()
  },
  methods: {
    setDate () {
      if (this.$route.query.date) {
        this.date = this.$route.query.date
      } else {
        const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)) // Timezone Tokyo
        const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
        this.date = date
      }
    },
    async listAttendances () {
      const res = await API.graphql(graphqlOperation(attendancesByDate, {
        schoolId: 'school',
        date: { eq: this.date }
      }))
      this.attendances = res.data.AttendancesByDate
    }
  }
}
</script>
