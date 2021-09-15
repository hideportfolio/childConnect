<template>
  <button
    class="button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<style scoped>
.button{
  background-color: #FFFFFF;
  color: #825959;
  width: 240px;
  height: 50px;
  text-align: center;
  border: 2px #825959 solid;
  border-radius: 30px;
  margin: 0 auto;
}
.button:hover{
  background-color: #825959;
  color: #FFFFFF;
  transition: 0.3s;
}
</style>
