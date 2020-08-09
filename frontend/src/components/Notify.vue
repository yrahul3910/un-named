<template>
  <div></div>
</template>
<script>
export default {
  name: 'notify',
  props: ['data'],
  data() {
    return {
      settings: {
        errorNotify: {
          color: 'red-7',
          icon: 'fas fa-exclamation-triangle'
        },
        successNotify: {
          color: 'positive',
          icon: 'fas fa-check-circle'
        }
      }
    }
  },
  mounted() {
    const settings = this.settings[this.data.type]
    this.$q.notify({
      ...settings,
      ...this.data,
      timeout: this.data.timeout || 1000,
      position: this.data.position || 'bottom-right'
    })
    this.$emit('notified')
  }
}
</script>
