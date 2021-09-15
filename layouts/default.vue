<template>
  <div>
    <header>
      <div class="headerContents">出欠管理システム</div>
    </header>
    <Nuxt />
  </div>
</template>
<style>
  body{
    background-color: #A1CAE2;
    padding-top: 80px;
  }
  /*header*/
  header{
    height: 60px;
    width: 100%;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    padding: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 999;
  }
  .headerContents{
    color: #A1CAE2;
    max-width: 800px;
    font-size: 20px;
    font-style: bold;
    margin: 0 auto;
  }

  h1{
    width: 100%;
    font-size: 24px;
    color: #FFFFFF;
    background-color: #A1CAE2;
    border-radius: 10px;
    padding: 8px;
    margin-bottom: 5px;
  }
  .card{
    width: 95%;
    max-width: 800px;
    background-color: #FFFFFF;
    margin: 20px auto;
    padding: 20px 10px 30px 10px;
  }
  /* 登録ボタン等 */
  .submit{
    background-color: #FFFFFF;
    color: #825959;
    width: 260px;
    height: 40px;
    text-align: center;
    border: 1px #825959 solid;
    border-radius: 30px;
  }
  .submit:hover{
    background-color: #825959;
    color: #FFFFFF;
    transition: 0.3s;
  }
  /* 戻るボタン */
  .back{
    background-color: #FFFFFF;
    color: #A1CAE2;
    width: 70px;
    height: 30px;
    text-align: center;
    border: 2px #FFFFFF solid;
    border-radius: 10px;
  }
  .back:before{
    display: inline-block;
    width: 16px;
    height: 16px;
    content: "";
    background: url("~assets/left-arrow-icon.svg");
    vertical-align: middle;
    margin: 1px 1px 4px 1px;
  }
  /* 返信用textarea */
  textarea{
  width: 270px;
  height: 80px;
  background: #FFFFFF;
  border: 1px solid #825959;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 0 auto 15px auto;
  resize: none;
}
/* 日付表示 */
.date {
  color: #825959;
  font-size: 18px;
  line-height: 20px;
  width: 100px;
  height: 20px;
  margin: 15px auto 5px;
}
/* 一覧表示(保護者側も) */
.children-list {
  color: #825959;
  width: 90%;
  max-width: 300px;
  height: 40px;
  line-height: 40px;

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
  margin:0 0 1px auto;
}
.button-box {
  margin:0 0 0 auto;
}
.CLattend {
  padding: 1px 7px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  color: #FFFFFF;
  background: #6CED9C;
  border: 3px solid #6CED9C;
  border-radius: 10px;
  line-height: 25px;
  cursor: default;
}
.CLabsent {
  padding: 1px 7px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  color: #FFFFFF;
  background: #FF7676;
  border: 3px solid #FF7676;
  border-radius: 10px;
  line-height: 25px;
  cursor: default;
}
.detail {
  padding: 1px 7px;
  height: 30px;
  color: #FFFFFF;
  background: #825959;
  border: 3px solid #825959;
  border-radius: 10px;
  line-height: 25px;
  margin-top: 5px;
}
</style>
