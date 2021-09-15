<template>
  <div>
    <button class="back" @click="$router.push({ path: '/parents/' })">戻る</button>
    <div class="card">
      <h1>あなたのお子様の出欠一覧</h1>
      <li v-for="(attendance, index) in attendances.items" :key="index" class="children-list">
        <div class="name-box">{{ attendance.date.replace(/-/g,'/') }}</div>
        <div class="button-box">
          <button v-if="attendance.attendance === 'ATTEND'" class="CLattend">出席</button>
          <button v-if="attendance.attendance === 'ABSENT'" class="CLabsent">欠席</button>
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
