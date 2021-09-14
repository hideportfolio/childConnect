<template>
  <div>
    <p>This is attendance page.</p>
    <p>{{ attendance }}</p>
  </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { getAttendance } from '~/graphql/queries'
export default {
  data () {
    return {
      attendance: {}
    }
  },
  async created () {
    await this.getAttendance()
  },
  methods: {
    async getAttendance () {
      const res = await API.graphql(graphqlOperation(getAttendance, { id: this.$route.params.id }))
      this.attendance = res.data.getAttendance
    }
  }
}
</script>
