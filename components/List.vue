<template>
  <div
    class="list"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 0px 10px 0px;
  padding: 10px 10px 10px 20px;
  border: 1px solid #825959;
  box-sizing: border-box;
  border-radius: 15px;
}
.list:hover{
  background-color: #E4D3D3;
  color: #FFFFFF;
  transition: 0.3s;
}
</style>
