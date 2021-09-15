<template>
  <div class="appBar">
    <div class="appBarTitle">{{ title }}</div>
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
}
.appBarTitle{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #A1CAE2;
}
</style>
