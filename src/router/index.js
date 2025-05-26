import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/UserList.vue'
import EditUser from '../components/EditUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'Users',
    component: UserList,
  },
  {
    path: '/edit-user',
    name: 'EditUser',
    component: EditUser,
    props: route => ({ id: route.query.id }),
    beforeEnter: (to, from, next) => {
      if (to.query && to.query.id) {
        // if id is present, allow navigation
        next()
      } else {
        alert('ID is required to edit a user.')
        next({ name: 'Users' })
      }
    },
  },
  {
    path: '/',
    redirect: '/users',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
