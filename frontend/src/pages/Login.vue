<template>
  <q-page
    class="bg-blue-grey-8 window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">UN-NAMMED</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="identifier"
                type="email"
                label="Email / Username"
                ref="identifier"
                :rules="[
                    val => !!val || 'Required *'
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Password"
                ref="password"
                :rules="[
                    val => !!val || 'Required *',
                    val => val.length >= 6 || 'Password must be more than 6 characters'
                ]"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              :disabled="throttle ? true : false"
              color="blue-grey-10"
              size="lg"
              class="full-width"
              label="Login"
              @click="handleLogin"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <notify v-if="notify.allow" :data="notify" @notified="notify.allow = !notify.allow"/>
  </q-page>
</template>

<script>
import Notify from '../components/Notify'
export default {
  name: 'Login',
  components: {
    Notify
  },
  data () {
    return {
      notify: {},
      throttle: false,
      identifier: '',
      password: ''
    }
  },
  methods: {
    async handleLogin () {
      this.throttle = true
      try {
        const { jwt } = await this.$api.login(this.identifier, this.password)
        localStorage.setItem(this.$constants.token, jwt)
        this.$router.push({ name: 'home' })
      } catch (e) {
        console.log(e)
        this.notify = {
          allow: true,
          message: 'Either email or password is wrong.',
          color: 'red-7',
          icon: 'fas fa-exclamation-triangle'
        }
      }
      this.throttle = false
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
