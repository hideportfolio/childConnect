<template>
  <p>This is root page.</p>
</template>

<script>
export default {
  middleware: 'auth',
  async mounted () {
    await this.$store.dispatch('user/getProfile')
    console.log(this.$store.getters['user/profile'])
  }
}
</script>
