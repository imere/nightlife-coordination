import axios from 'axios'
export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('SET_USER', req.session.user)
    }
  },
  async login ({ commit }, { user, pass }) {
    try {
      const { data } = await axios.post('/user/login', { user, pass })
      commit('SET_USER', data.user)
    } catch (ex) {
      throw ex
    }
  },
  async logout ({ commit }) {
    await axios.post('/user/logout')
    commit('SET_USER', null)
  }
}
