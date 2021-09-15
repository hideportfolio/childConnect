<template>
  <div>
    <button class="back" @click="$router.push({ path: '/parents/' })">戻る</button>
    <div class="card">
      <h1>出欠登録</h1>
      <div class="date">{{ todayData.replace('-','/') }}</div>
      <p class="attP">
        <input name="attend" type="radio" v-model="attendance" value="ATTEND" id="attend">
        <label for="attend" class="attend">出席</label>

        <input name="attend" type="radio" v-model="attendance" value="ABSENT" id="absence">
        <label for="absence" class="absence">欠席</label>
      </p>
      <p class="attP">
        <div class="text">
          <label for="text" class="text-label">メッセージ（任意）</label>
        </div>
        <textarea name="text" v-model="remarks">ここに記入してください</textarea>
      </p>
      <div class="submit-box">
        <button @click="postAttendace()" class="submit">登録</button>
      </div>
    </div>
  </div>
</template>

<!--attendanceType : プルダウン形式や保存するやデータの制限用に使うかもしれない//-->
<script>
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createAttendance, createThread } from '~/graphql/mutations'
export default {
  middleware: 'auth',
  data () {
    return {
      attendance: 'ATTEND',
      attendanceType: [
        'ATTEND',
        'ABSENT'
      ],
      date: '',
      remarks: ''
    }
  },
  computed: {
    todayData () {
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
      return (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate())
    }
  },
  methods: {
    async postAttendace () {
      const auth = await Auth.currentUserInfo()
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)) // Timezone Tokyo
      const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
      const attendanceRes = await API.graphql(graphqlOperation(createAttendance, {
        input: {
          schoolId: 'school',
          userId: auth.username,
          date,
          attendance: this.attendance,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }))
      if (this.remarks !== '') {
        const remarksRes = await API.graphql(graphqlOperation(createThread, {
          input: {
            attendanceId: attendanceRes.data.createAttendance.id,
            userId: auth.username,
            contents: this.remarks,
            timestamp: Math.floor(Date.now() / 1000)
          }
        }))
        console.log(remarksRes)
      }
      this.$router.push({ path: '/parents/attendance/list' })
    }
  }
}

</script>

<style>
.attP {
  display:flex;
  justify-content:center;
  margin-bottom: 5px;
}

.date {
  /* 2021/9/17 */
  color: #825959;
  font-size: 18px;
  line-height: 21px;
  width: 100px;
  height: 21px;
  margin: 15px auto 5px;
}

input[type=radio]{
  display: none;
}

.attend {
  color: #6CED9C;

  font-size: 36px;
  line-height: 42px;

  background-color: white;
  width: 45%;
  max-width: 240px;
  height: 80px;

  border: 3px solid #6CED9C;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px;
  line-height: 80px;

  text-align: center;
}
.attend:hover {
  background-color: #dfffea;
  transition: 0.3s;
}

.absence {
  color: #FF7676;

  font-size: 36px;
  line-height: 80px;

  background-color: white;
  width: 45%;
  max-width: 240px;
  height: 80px;

  border: 3px solid #FF7676;
  box-sizing: border-box;
  border-radius: 10px;

  text-align: center;
  margin: 10px;
}
.absence:hover {
  background-color: #ffd9d9;
  transition: 0.3s;
}

input[type=radio]:checked + label.attend {
  color: white;
  background-color: #6CED9C;
}

input[type=radio]:checked + label.absence {
  color: white;
  background-color: #FF7676;
}

.text {
  font-size: 14px;
  line-height: 14px;

  color: #825959;
  margin: 0 auto;
  width: 251px;
}
.text-label {
  margin-bottom: 1px;
}

.submit-box {
  display:flex;
  justify-content:center;
}
</style>
