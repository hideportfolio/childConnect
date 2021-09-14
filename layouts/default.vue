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

  .submit{
    background-color: #FFFFFF;
    color: #825959;
    width: 240px;
    height: 50px;
    text-align: center;
    border: 2px #825959 solid;
    border-radius: 30px;
  }
  .submit:hover{
    background-color: #825959;
    color: #FFFFFF;
    transition: 0.3s;
  }
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
</style>
