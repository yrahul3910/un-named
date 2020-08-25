<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header>
        <q-toolbar class="bg-pink-7 text-white shadow-2">
          <q-btn label="un-named" flat @click="$router.push('/')"></q-btn>
          <q-space />
        </q-toolbar>
      </q-header>
      <router-view :key="$route.params.id"/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'profile'
}
</script>
