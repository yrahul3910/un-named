<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header>
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-btn label="un-named" flat @click="$router.push('/')"></q-btn>
          <q-space />
        </q-toolbar>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'profile'
}
</script>
