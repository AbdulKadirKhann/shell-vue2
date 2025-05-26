<template>
  <div>
    <div>
      <h1>Module Federation between Vue2 shell and Vue3 Remotes</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import mitt from 'mitt'
  import i18n from './locales/i18n'

  //Creating a global event emitter using mitt to transfer events between micro-frontends
  const emitter = mitt()

  export default {
    name: 'App',
    components: {
      UserList: () => import('./components/UserList.vue'),
      EditUser: () => import('./components/EditUser.vue'),
    },
    mounted() {
      //Setup emitter to transfer events between micro-frontends and shared i18n instance
      window.shellEmitter = emitter
      window.shellI18n = {
        t: i18n.t.bind(i18n),
        locale: i18n.locale,
        messages: i18n.messages,
      }
    },
  }
</script>
