import { Auth, API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries' // read
// import * as gqlMutations from '../graphql/mutations' // create, update, delete

export const state = () => ({
  profile: undefined
})

export const mutations = {
  setProfile (state, data) {
    state.profile = data
  },
  removeProfile (state) {
    state.profile = undefined
  }
}

export const actions = {
  async getProfile ({ commit }) {
    const auth = await Auth.currentUserInfo()
    const res = await API.graphql(graphqlOperation(gqlQueries.getUser, {
      id: auth.username
    }))
    commit('setProfile', res.data.getUser)
  }
}

export const getters = {
  profile: (state) => {
    return state.profile
  }
}
