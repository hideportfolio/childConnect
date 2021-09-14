<template>
  <div class="card">
    <h1>園児一覧</h1>
    <div class="date">{{date}}</div>
    <div>
        <li v-for="(item,index) in attendances.items" :key="index" class="children-list">
          <div class="name-box">
            {{ item.user.lastname }} {{ item.user.firstname }}
          </div>
          <div class="button-box">
            <button v-if="item.attendance === 'ATTEND'" class="attend">出席</button>
            <button v-if="item.attendance === 'ABSENT'" class="absent">欠席</button>
            <button type=“button” class="detail" @click="$router.push({ path: '/teachers/attendance/detail', query: { user: item.userId, date: item.date }})" >詳細</button>
          </div>
        </li>
    </div>

  </div>
</template><template>
  <div class="card">
    <h1>園児一覧</h1>
    <div class="date">{{date}}</div>
    <div>
        <li v-for="(item,index) in attendances.items" :key="index" class="children-list">
          <div class="name-box">
            {{ item.user.lastname }} {{ item.user.firstname }}
          </div>
          <div class="button-box">
            <button v-if="item.attendance === 'ATTEND'" class="attend">出席</button>
            <button v-if="item.attendance === 'ABSENT'" class="absent">欠席</button>
            <button type=“button” class="detail" @click="$router.push({ path: '/teachers/attendance/detail', query: { user: item.userId, date: item.date }})" >詳細</button>
          </div>
        </li>
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

.children-list {
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
  margin:0 0 0 auto;
}
.button-box {
  margin:0 0 0 auto;
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


<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { attendancesByDate } from '~/graphql/queries'
export default {
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

.children-list {
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
