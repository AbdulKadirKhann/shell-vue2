<template>
  <div ref="remoteAppRoot"></div>
</template>

<script>
  const moduleMap = {
    users_app_vue3: () => import('users_app_vue3/App'),
    edit_user_app_vue3: () => import('edit_user_app_vue3/App'),
  }

  export default {
    name: 'RemoteAppLoader',
    props: {
      appName: {
        type: String,
        required: true,
      },
    },
    mounted() {
      const importFn = moduleMap[this.appName]
      if (importFn) {
        importFn()
          .then(mountApp => {
            if (mountApp && typeof mountApp.default === 'function') {
              mountApp.default(this.$refs.remoteAppRoot)
              this.$emit('remoteComponentLoaded')
            } else {
              console.error(
                `Remote app (${this.appName}) does not export a default mount function.`
              )
            }
          })
          .catch(err => {
            console.error(`Failed to load remote app ${this.appName}:`, err)
          })
      } else {
        console.error(`No module found for appName: ${this.appName}`)
      }
    },
    beforeDestroy() {
      if (this.$refs.remoteAppRoot) {
        this.$refs.remoteAppRoot.innerHTML = ''
      }
    },
  }
</script>
