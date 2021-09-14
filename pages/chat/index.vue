<template>
  <div>
    <p>This is chat page.</p>
    <p>{{ comments }}</p>
    <input v-model="replay" placeholder="返信">
    <button @click="postReplay()">Replay</button>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { threadsByTimestamp } from '~/graphql/queries'
import { createThread } from '~/graphql/mutations'
import { onCreateThread } from '~/graphql/subscriptions'

export default {
  middleware: 'auth',
  data () {
    return {
      subscription: null,
      comments: [],
      replay: ''
    }
  },
  created () {
    this.getComments()
    this.subscription = API.graphql(
      graphqlOperation(onCreateThread)
    ).subscribe({
      next: (data) => {
        const createdData = data.value.data.onCreateThread
        this.comments.push(createdData)
      }
    })
  },
  beforeDestroy () {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
  },
  methods: {
    async postReplay () {
      const auth = await Auth.currentUserInfo()
      await API.graphql(graphqlOperation(createThread, {
        input: {
          attendanceId: this.$route.query.id,
          userId: auth.username,
          contents: this.replay,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }))
      this.replay = ''
    },
    async getComments () {
      const res = await API.graphql(graphqlOperation(threadsByTimestamp, { attendanceId: this.$route.query.id }))
      this.comments = res.data.ThreadsByTimestamp.items
    }
  }
}
</script>
