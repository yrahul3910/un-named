<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-btn
        color="primary"
        flat
        label="Logout"
        class="full-width absolute-bottom"
        @click="handleLogout"
      >
          <q-icon name="logout" size="18px" class="q-ml-sm"/>
      </q-btn>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    async handleLogout () {
      await localStorage.removeItem(this.$constants.token)
      await this.$store.dispatch('user/buildstate', {
        status: this.$constants.unauthorized,
        data: null
      })
      await this.$router.replace({ name: 'auth' })
    }
  }
}
</script>
