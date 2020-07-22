<template>
    <div></div>
</template>
<script>
export default {
  name: 'notify',
  props: ['data'],
  mounted () {
    this.$q.notify({
      ...this.data,
      position: 'bottom-right',
      timeout: 1000
    })
    this.$emit('notified')
  }
}
</script>
