import allUsers from './usersData'

export default {
  namespaced: true,
  state: {
    items: [],
    allItems: [],
    currentPage: 1,
    pageSize: 10,
    totalUsers: allUsers.length,
  },
  getters: {
    items: state => state.items,
    currentPage: state => state.currentPage,
    totalPages: state => Math.ceil(state.totalUsers / state.pageSize),
    hasPrevPage: state => state.currentPage > 1,
    hasNextPage: state =>
      state.currentPage < Math.ceil(state.totalUsers / state.pageSize),
  },
  mutations: {
    addUser(state, user) {
      state.items.push(user)
    },
    setUsers(state, users) {
      state.items = users
    },
    setPage(state, page) {
      state.currentPage = page
    },
    setAllUsers(state) {
      state.allItems = allUsers
    },
    updateUser(state, updatedUser) {
      const index = state.allItems.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.allItems.splice(index, 1, updatedUser)
      }
    },
  },
  actions: {
    async loadUsers({ commit, state }) {
      const start = (state.currentPage - 1) * state.pageSize
      const end = start + state.pageSize
      await commit('setAllUsers')
      const pageUsers = state.allItems.slice(start, end)
      commit('setUsers', pageUsers)
    },
    nextPage({ commit, state, dispatch }) {
      if (state.currentPage < Math.ceil(state.totalUsers / state.pageSize)) {
        commit('setPage', state.currentPage + 1)
        dispatch('loadUsers')
      }
    },
    previousPage({ commit, state, dispatch }) {
      if (state.currentPage > 1) {
        commit('setPage', state.currentPage - 1)
        dispatch('loadUsers')
      }
    },
    goToPage({ commit, dispatch }, page) {
      commit('setPage', page)
      dispatch('loadUsers')
    },
    updateUser({ commit }, updatedUser) {
      commit('updateUser', updatedUser)
    },
  },
}
