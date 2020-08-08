<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        {{ $t('pages.error.status') }}
      </div>

      <div class="text-h2 text-weight-bold" style="opacity:.4">
        {{ $t('pages.error.tagline') }}
      </div>

      <q-btn
        class="q-mt-xl text-uppercase"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="$t('pages.error.home')"
        no-caps
      />
    </div>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
