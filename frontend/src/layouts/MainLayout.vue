<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-grey-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          UN-NAMED
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple @click="$router.push({ name: 'settings' })">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              Settings
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-btn
        color="primary"
        flat
        label="Logout"
        class="full-width absolute-bottom"
        @click="handleLogout"
      >
        <q-icon name="logout" size="18px" class="q-ml-sm" />
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
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    async handleLogout() {
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
