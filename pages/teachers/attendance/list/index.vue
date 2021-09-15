<template>
  <div>
    <button class="back" @click="$router.push({ path: '/teachers/' })">戻る</button>
    <div class="card">
      <h1>園児一覧</h1>
      <div class="date">{{date.replace(/-/g,'/')}}</div>
      <div>
        <li v-for="(item,index) in attendances.items" :key="index" class="children-list">
          <div class="name-box">
            {{ item.user.lastname }} {{ item.user.firstname }}
          </div>
          <div class="button-box">
            <button v-if="item.attendance === 'ATTEND'" class="CLattend">出席</button>
            <button v-if="item.attendance === 'ABSENT'" class="CLabsent">欠席</button>
            <button type=“button” class="detail" @click="$router.push({ path: '/teachers/attendance/detail', query: { user: item.userId, date: item.date }})" >詳細</button>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { attendancesByDate } from '~/graphql/queries'

export default {
  middleware: 'auth',
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
