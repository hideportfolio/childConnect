<template>
  <div>
    <button class="back">戻る</button>
    <div class="card">
      <h1>出欠の詳細</h1>
      <div class="date">{{ todayData }}</div>
      <div class="status">
        <span>
          <button v-if="attendance.attendance === 'ATTEND'" class="attend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="absent">欠席</button>
        </span>
        <!-- <span class="name" v-if="attendance.user">{{attendance.user.lastname}} {{ attendance.user.firstname }}</span> -->
      </div>
      <p>メッセージ</p>
      <div class="parent-message">
        <!-- <p v-if="attendance.threads">{{ attendance.threads.items[0].contents }}</p> -->
      </div>
      <br>
      <p>返信</p>
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
      date: ''
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
    border-radius:10px;
    color:#FFFFFF;
    background-color: #6CED9C;
  }
  .absent{
    font-size: 18px;
    border: none;
    outline: none;
    border-radius:10px;
    color:#FFFFFF;
    background-color: #FF7676;
  }
  .parent-message{
    font-size: 18px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    margin: 0 auto;
    border: 1px solid #EFEFEF;
    background-color:#EFEFEF;
    border-radius: 10px;
  }
  .submit{
    font-size: 18px;
    text-align: center;
    margin: 0 auto;
  }
  .card p{
    font-size: 18px;
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
