<template>
  <div></div>
</template>
<script>
export default {
  name: 'social-login',
  async mounted() {
    const provider = localStorage.getItem(this.$constants.provider)
    const parameter = this.$route.fullPath.split('/provider')[1]
    if (!provider || parameter === '') {
      localStorage.removeItem(this.$constants.provider)
      this.$router.replace({ name: 'auth' })
    }
    this.$q.loading.show()
    const data = await this.$api.connectWithProvider(provider, parameter)
    localStorage.setItem(this.$constants.token, data.jwt)
    await this.$socket.emit(this.$constants.auth, { data: data.jwt })
    await this.$router.replace({ name: 'home' })
  }
}
</script>
