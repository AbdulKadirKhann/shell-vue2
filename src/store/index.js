import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import selectedUser from './selectedUser'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    selectedUser,
  },
})
