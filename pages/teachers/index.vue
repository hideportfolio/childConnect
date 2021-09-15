<template>
  <BaseCard>
    <BaseCardTitle>マイページ</BaseCardTitle>
    <BaseCardSubtitle>{{ $store.getters['user/profile'].lastname + $store.getters['user/profile'].firstname }}さんとしてログイン中</BaseCardSubtitle>

    <BaseCardSubtitle>出欠操作</BaseCardSubtitle>
    <BaseList @click="$router.push('/teachers/attendance/list')">
      <BaseListItemTitle>出欠一覧</BaseListItemTitle>
      <BaseListItemSubtitle>出欠情報およびコメントを確認</BaseListItemSubtitle>
    </BaseList>

    <BaseCardSubtitle>アカウント操作</BaseCardSubtitle>
    <BaseList @click="logout()">
      <BaseListItemTitle>ログアウト</BaseListItemTitle>
    </BaseList>
  </BaseCard>
</template>

<script>
import Auth from '@aws-amplify/auth'
export default {
  middleware: 'auth',
  layout: 'noCss',
  methods: {
    async logout () {
      await Auth.signOut()
      this.$router.push('/login')
    }
  }
}
</script>
