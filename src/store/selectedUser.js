export default {
  namespaced: true,
  state: {
    item: null,
    loading: false,
    error: null,
  },
  getters: {
    item: state => state.item,
    isLoading: state => state.loading,
    hasError: state => !!state.error,
    errorMessage: state => state.error,
  },
  mutations: {
    setSelectedUser(state, user) {
      state.item = user
      state.error = null
    },
    setLoading(state, isLoading) {
      state.loading = isLoading
    },
    setError(state, error) {
      state.error = error
      state.item = null
    },
  },
  actions: {
    async fetchUser({ commit, rootState, dispatch }, userId) {
      commit('setLoading', true)

      try {
        const id = typeof userId === 'string' ? parseInt(userId) : userId

        // Get users from the users store module
        let users = rootState.users.items
        if (users.length === 0) {
          await dispatch('users/loadUsers', null, { root: true })
          users = rootState.users.items
        }
        // Use the users from the store
        const user = users.find(user => user.id === id)
        if (user) {
          commit('setSelectedUser', user)
        } else {
          commit('setError', `User with ID ${id} not found`)
        }
      } catch (error) {
        commit('setError', error.message || 'Failed to select user')
      } finally {
        commit('setLoading', false)
      }
    },

    async editUser({ commit, dispatch, rootState }, updatedUser) {
      commit('setLoading', true)
      try {
        await dispatch('users/updateUser', updatedUser, { root: true })
        commit('setSelectedUser', updatedUser)
        return updatedUser
      } catch (error) {
        commit('setError', error.message || 'Failed to update user')
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
