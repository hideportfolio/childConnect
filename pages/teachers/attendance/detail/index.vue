<template>
  <div>
    <button class="back" @click="$router.push({ path: '/teachers/attendance/list' })">戻る</button>
    <div class="card">
      <h1>出欠の詳細</h1>
      <div class="date">{{ todayData }}</div>
      <div class="status">
        <span>
          <button v-if="attendance.attendance === 'ATTEND'" class="CLattend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="CLabsent">欠席</button>
        </span>
        <span class="name" v-if="attendance.user">{{attendance.user.lastname}} {{ attendance.user.firstname }}</span>
      </div>
      <button class="past-message" v-if="attendance.id" @click="$router.push({ path: '/chat', query: { id: attendance.id }})">過去のメッセージ></button>
      <div class="message-container">
        <span >最新メッセージ{{ latestMessage=='' ? 'はありません。' : '' }}</span>
        <div>
          <p class="parent-message" v-if="latestMessage!=''">{{latestMessage}}</p>
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
  middleware: 'auth',
  data () {
    return {
      attendance: {},
      replay: '',
      date: '',
      latestMessage: ''
    }
  },
  computed: {
    todayData () {
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
      return (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate())
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
    },
    getLatestMessage () {
      this.latestMessage = this.attendance.threads.items.length === 0 ? '' : this.attendance.threads.items[0].contents
    }
  }
}
</script>
