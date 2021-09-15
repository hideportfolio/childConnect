<template>
  <div>
    <p v-if="userProfile">{{ userProfile.lastname + userProfile.firstname }}さんの出席一覧</p>
    <p>{{ attendances }}</p>
  </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { getUser, listAttendaces } from '~/graphql/queries'

export default {
  middleware: 'auth',
  data () {
    return {
      userProfile: undefined,
      attendances: []
    }
  },
  created () {
    this.getUserProfile()
    this.listAttendances()
  },
  methods: {
    async getUserProfile () {
      const res = await API.graphql(graphqlOperation(getUser, {
        id: this.$route.params.id
      }))
      this.userProfile = res.data.getUser
    },
    async listAttendances () {
      const res = await API.graphql(graphqlOperation(listAttendaces, {
        userId: this.$route.params.id
      }))
      this.attendances = res.data.listAttendaces
    }
  }
}
</script>
