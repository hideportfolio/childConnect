<template>
  <div class="cardSubtitle">
    <div class="subtitleText">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cardSubtitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0px 5px 0px;
  padding: 0px 0px 0px 5px;
}
.subtitleText {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #AFAFAF;
}
</style>
