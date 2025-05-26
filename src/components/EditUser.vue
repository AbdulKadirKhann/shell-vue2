<template>
  <div>
    <RemoteAppLoaderVue
      @remoteComponentLoaded="onLoad"
      appName="edit_user_app_vue3"
    ></RemoteAppLoaderVue>
  </div>
</template>

<script>
  import RemoteAppLoaderVue from './RemoteAppLoader.vue'

  export default {
    name: 'EditUser',
    components: {
      RemoteAppLoaderVue,
    },
    props: {
      id: {
        type: [String, Number],
        required: true,
        default: null,
      },
    },
    methods: {
      onLoad() {
        // This method is called once the remote component is loaded
        //Get the user details from the Vuex store using the id prop and emit event which the remote will listen to
        this.$store.dispatch('selectedUser/fetchUser', this.id).then(() => {
          const userData = this.$store.getters['selectedUser/item']
          window.shellEmitter.emit('user-loaded', userData)
        })
        //Remote will emit an event when the user is updated so listen to it
        window.shellEmitter.on('user-updated', this.editUserAndNavigate)
      },
      editUserAndNavigate(user) {
        // This method is called when the user is edited in the remote component
        this.$store.dispatch('selectedUser/editUser', user).then(() => {
          //Avoid duplicate navigation if already on EditUser route. Can also be done via route guards
          if (this.$route.name === 'Users') return
          this.$router.push({
            name: 'Users',
          })
        })
      },
    },
  }
</script>

<style scoped>
  /* Add styles if needed */
</style>
