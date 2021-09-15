<template>
  <div>
    <button class="back" @click="$router.push({ path: '/parents/attendance/list' })">戻る</button>
    <div class="card">
      <h1>出欠の詳細</h1>
      <div v-if="attendance.date" class="date">{{ attendance.date }}</div>
      <div class="status">
        <span>
          <button v-if="attendance.attendance === 'ATTEND'" class="CLattend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="CLabsent">欠席</button>
        </span>
        <span v-if="attendance.user" class="name">{{attendance.user.lastname}} {{ attendance.user.firstname }}</span>
      </div>
      <button v-if="attendance.id" class="past-message" @click="$router.push({ path: '/chat', query: { id: attendance.id }})">過去のメッセージ></button>
      <div class="message-container">
        <span>最新メッセージ{{ latestMessage=='' ? 'はありません。' : '' }}</span>
        <div>
          <p v-if="latestMessage!=''" class="parent-message">{{ latestMessage }}</p>
        </div>
      </div>
      <span>返信</span>
      <textarea class="rep" v-model="replay"></textarea>
      <button class="submit" @click="postReplay()">返信</button>
    </div>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getAttendance } from '~/graphql/queries'
import { createThread } from '~/graphql/mutations'

export default {
  data () {
    return {
      attendance: {},
      replay: '',
      latestMessage: ''
    }
  },
  async created () {
    await this.getAttendance()
    this.getLatestMessage()
  },
  methods: {
    async postReplay () {
      const auth = await Auth.currentUserInfo()
      const res = await API.graphql(graphqlOperation(createThread, {
        input: {
          attendanceId: this.attendance.id,
          userId: auth.username,
          contents: this.replay
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
    },
    getLatestMessage () {
      this.latestMessage = this.attendance.threads.items.length === 0 ? '' : this.attendance.threads.items[0].contents
    }
  }
}
</script>
