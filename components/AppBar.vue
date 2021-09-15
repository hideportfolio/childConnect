<template>
  <div class="appBar">
    <div class="appBarTitle"><img class="CCicon" src="/icon.png">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped>
.appBar{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  z-index: 999;
}
.appBarTitle{
  font-size: 30px;
  color: #A1CAE2;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.CCicon{
  width: 50px;
  height: 50px;
}
</style>
