<template>
  <button type="button" class="google-button" @click="$emit('clicked')">
      <q-icon class="q-ml-sm" size="16px" name="fab fa-facebook"></q-icon>
    <span class="google-button__text">
      {{ $t('pages.auth.connect_with_facebook') }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'google-signin-button'
}
</script>

<style lang="scss" scoped>
.google-button {
  height: 40px;
  border-width: 0;
  background: #4294ff;
  color: #f2f2f2;
  border-radius: 5px;
  white-space: nowrap;
  outline: none;
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  padding: 0 10px;
  box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.1);
  &:focus,
  &:hover {
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #e5e5e5;
    box-shadow: none;
    transition-duration: 10ms;
  }
}

.google-button__text {
  display: inline-block;
  vertical-align: middle;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', arial, sans-serif;
}
</style>
