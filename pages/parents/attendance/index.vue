<template>
  <div class="a">
    <div class="card">
      <h1>出席登録</h1>
      <div class="date">{{todayData}}</div>
      <p>
        <input name="attend" type="radio" v-model="attendance" value="ATTEND" id="attend">
        <label for="attend" class="attend">出席</label>

        <input name="attend" type="radio" v-model="attendance" value="ABSENT" id="absence">
        <label for="absence" class="absence">欠席</label>
      </p>
      <p>
        <div class="text">
          <label for="text" class="text-label">メッセージ（任意）</label>
        </div>
        <textarea name="text" rows="5" cols="10" v-model="text">ここに記入してください</textarea>
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
import { createAttendance } from '~/graphql/mutations'
export default {
  layout: 'default',
  middleware: 'auth',
  data () {
    return {
      attendance: 'ATTEND',
      attendanceType: [
        'ATTEND',
        'ABSENT'
      ],
      date: '',
      text: ''
    }
  },
  methods: {
    async postAttendace () {
      const auth = await Auth.currentUserInfo()
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)) // Timezone Tokyo
      const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
      const res = await API.graphql(graphqlOperation(createAttendance, {
        input: {
          schoolId: 'school',
          userId: auth.username,
          date,
          attendance: this.attendance,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }))
      console.log(res)
    }
  },
  computed: {
    todayData () {
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
      return (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate())
    }
  }
}

</script>

<style>
.a {
  width: 100%;
  height: 800px;
  background: #A1CAE2;
}
.card {
  padding: 15px;
  width: 90%;
  margin: 30px auto;
}
h1 {
  color: #FFFFFF;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  margin: 0 auto;
}

p {
  display:flex;
  justify-content:center;
  margin-bottom: 5px;
}

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

input[type=radio]{
  display: none;
}

.attend {
  color: #6CED9C;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  background-color: white;
  width: 116px;
  height: 81px;

  border: 3px solid #6CED9C;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px;
  line-height: 81px;

  text-align: center;
}

.absence {
  color: #FF7676;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 81px;

  background-color: white;
  width: 112px;
  height: 82px;

  border: 3px solid #FF7676;
  box-sizing: border-box;
  border-radius: 10px;

  text-align: center;
  margin: 10px;
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
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
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

.submit {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  margin: 20px auto;

  border: 1px solid #825959;
}

textarea {
  width: 251px;
  height: 83px;
  background: #FFFFFF;
  border: 1px solid #825959;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 0 auto;
  resize: none;
}
</style>
