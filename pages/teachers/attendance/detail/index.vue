<template>
  <div>
    <button class="back" @click="$router.push({ path: '/teachers/attendance/list' })">戻る</button>
    <div class="card">
      <h1>出欠の詳細</h1>
      <div class="date">{{ todayData }}</div>
      <div class="status">
        <span>
          <button v-if="attendance.attendance === 'ATTEND'" class="attend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="absent">欠席</button>
        </span>
        <span class="name" v-if="attendance.user">{{attendance.user.lastname}} {{ attendance.user.firstname }}</span>
      </div>
      <button class="past-message" @click="$router.push({ path: '/teachers/attendance/detail', query: { user: item.userId, date: item.date }})">過去のメッセージ></button>
      <div class="message-container">
        <span>最新メッセージ</span>
        <div>
          <p class="no-message" v-if="latestMessage==''">最新メッセージはありません。</p>
          <p class="parent-message" v-if="latestMessage!=''">{{latestMessage}}</p>
        </div>
      </div>
      <span>返信</span>
      <input class="rep" v-model="replay" placeholder="返信">
      <br>
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
  layout: 'default',
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

<style>
  .date{
    text-align: center;
    color: #825959;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    width: 100px;
    height: 21px;
    margin: 15px auto 5px;
  }
  .attend{
    font-size: 18px;
    border: none;
    outline: none;
    border-radius:5px;
    color:#FFFFFF;
    background-color: #6CED9C;
  }
  .absent{
    font-size: 18px;
    border: none;
    outline: none;
    border-radius:5px;
    color:#FFFFFF;
    background-color: #FF7676;
  }
  .past-message{
    font-size: 10px;
    border: none;
    outline: none;
    border-radius:5px;
    color:#FFFFFF;
    background-color: #A1CAE2;
    margin:0 0 0 auto;
    width: 135px;
  }
  .no-message{
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
    margin: 0 auto;
    border-radius: 5px;
  }
  .parent-message{
    font-size: 18px;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid #EFEFEF;
    background-color:#EFEFEF;
    border-radius: 5px;
    width: 270px;
  }
  .message-container {
    max-width: 300px;
    margin: 0 auto;
  }
  .submit{
    font-size: 18px;
    text-align: center;
    margin: 0 auto;
  }
  .card{
    color: #825959;
  }
  .rep{
    font-size: 18px;
    color: #825959;
  }
  .status{
    font-size: 18px;
    margin: 0 auto;
    text-align: center;
  }
  .rep{
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border: 1.5px solid #825959;
  }
  .name{
    font-size: 30px;
    margin: 0 auto;
    text-align: center;
    color: #825959;
  }
</style>
