<template>
  <header>
    <div class="headerContents">{{ title }}</div>
  </header>
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
</style>
