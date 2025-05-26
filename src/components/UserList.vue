<template>
  <div>
    <RemoteAppLoaderVue
      @remoteComponentLoaded="onLoad"
      appName="users_app_vue3"
    ></RemoteAppLoaderVue>
  </div>
</template>

<script>
  import RemoteAppLoaderVue from './RemoteAppLoader.vue'
  export default {
    name: 'UserTable',
    components: {
      RemoteAppLoaderVue,
    },
    watch: {
      //When users are updated, emit an event to notify the shell
      users(newUsers) {
        window.shellEmitter.emit('users-updated', newUsers) //This is to inform the remote that list is ready
      },
    },
    computed: {
      //Get users from the Vuex store so its reactive
      users() {
        return this.$store.getters['users/items']
      },
    },
    methods: {
      onLoad() {
        //OnLoad is called once the remote component is loaded
        this.$store.dispatch('users/loadUsers')
        window.shellEmitter.on('edit-user', this.navigateToEditUser)
      },
      navigateToEditUser(user) {
        //Avoid duplicate navigation if already on EditUser route. Can also be done via route guards
        if (this.$route.name === 'EditUser' && this.$route.query.id === user.id)
          return

        this.$router.push({
          name: 'EditUser',
          query: { id: user.id },
        })
      },
    },
  }
</script>

<style scoped></style>
