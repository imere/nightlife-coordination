export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  }
}

export const actions = {
  nuxtSererInit ({ commit }, { req }) {
    require('es6-promise/auto')
  },
  login: ({ commit }, { user }) => {
    commit('SET_USER', user)
  }
}
