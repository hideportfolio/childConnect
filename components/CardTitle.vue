<template>
  <div class="cardTitle">
    <div class="titleText">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cardTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 10px 0px;
  padding: 10px 10px 10px 20px;
  background: #A1CAE2;
  border-radius: 15px;
}
.titleText {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}
</style>
