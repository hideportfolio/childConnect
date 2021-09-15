import { Auth } from 'aws-amplify'

export default async ({ redirect, store }) => {
  const authInfo = await Auth.currentUserInfo()
  if (!authInfo) {
    redirect('/login')
  } else {
    await store.dispatch('user/getProfile')
  }
}
