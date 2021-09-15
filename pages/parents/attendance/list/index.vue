<template>
  <div>
    <div class="card">
      <h1>あなたのお子様の出欠一覧</h1>
      <li v-for="(attendance, index) in attendances.items" :key="index" class="chlidren-list">
        <div class="name-box">{{ attendance.date.replace(/-/g,'/') }}</div>
        <div class="button-box">
          <button v-if="attendance.attendance === 'ATTEND'" class="attend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="absent">欠席</button>
        </div>
        <button type=“button” class="detail" @click="$router.push({ path: '/parents/attendance/detail', query: { user: attendance.userId, date: attendance.date }})" >詳細</button>
      </li>
    </div>
  </div>
</template>
<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { listAttendaces } from '~/graphql/queries'

export default {
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
<style>
.date {
  /* 2021/9/17 */
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

.chlidren-list {
  color: #825959;
  width: 90%;
  max-width: 300px;
  height: 41px;
  line-height: 41px;

  border: 1px solid #825959;
  box-sizing: border-box;
  border-radius: 9px;
  list-style: none;
  margin: 10px auto;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.name-box {
  margin:0 0 0 auto
}
.button-box {
  margin:0 0 0 auto
}
.attend {
  padding: 1px 7px;
  height: 31px;
  line-height: 31px;
  margin-top: 5px;
  color: #FFFFFF;
  background: #6CED9C;
  border: 3px solid #6CED9C;
  border-radius: 10px;
  line-height: 25px;
}
.absent {
  padding: 1px 7px;
  height: 31px;
  line-height: 31px;
  margin-top: 5px;
  color: #FFFFFF;
  background: #FF7676;
  border: 3px solid #FF7676;
  border-radius: 10px;
  line-height: 25px;
}
.detail {
  padding: 1px 7px;
  height: 31px;
  color: #FFFFFF;
  background: #825959;
  border: 3px solid #825959;
  border-radius: 10px;
  line-height: 25px;
  margin-top: 5px;
}
</style>
