<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$socket.on(this.$constants.userUpdate, payload => {
      // TODO: Save data to global state for later use.
      console.log({
        location: 'app.vue',
        payload
      })
    })
  }
}
</script>
