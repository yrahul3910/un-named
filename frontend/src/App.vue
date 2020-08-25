<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // check for dark mode
    if (localStorage.getItem(this.$constants.darkmode)) {
      this.$q.dark.set(true)
    }
  }
}
</script>
