<template>
  <q-page
    class="window-height window-width row justify-center items-center overview"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h4 text-grey-8 text-weight-bold q-my-md">UN-NAMMED</h5>
      </div>
      <div class="row">
        <q-card class="q-pa-lg shadow-1 card">
          <q-card-section class="row justify-center">
            <GoogleSigninBtn @action="connectWithGoogle" />
          </q-card-section>
          <div class="text-overline text-center text-grey-7 text-weight-bold">
            OR LOGIN WITH
          </div>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                squaGoogleSigninBtnre
                filled
                clearable
                clear-icon="close"
                v-model="identifier"
                tabindex="1"
                type="email"
                label="Email / Username"
              />
              <q-input
                square
                filled
                tabindex="2"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                @keydown.enter="handleLogin()"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              :disabled="throttle ? true : false"
              size="md"
              color="primary"
              unelevated
              label="Login"
              class="full-width text-weight-bold __cta"
              @click="handleLogin"
            >
            </q-btn>
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-caption text-grey-6 cursor-pointer __anchor">
              Don't have an account? Create one.
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <notify
      v-if="notify.allow"
      :data="notify"
      @notified="notify.allow = !notify.allow"
    />
  </q-page>
</template>

<script>
import Notify from '../components/Notify'
import GoogleSigninBtn from '../components/GoogleSigninBtn'
export default {
  name: 'Login',
  components: {
    Notify,
    GoogleSigninBtn
  },
  data() {
    return {
      notify: {},
      isPwd: true,
      throttle: false,
      identifier: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      this.throttle = true
      const errorNotify = {
        allow: true,
        color: 'red-7',
        icon: 'fas fa-exclamation-triangle'
      }
      if (!this.identifier && !this.password) {
        console.log({ identifier: this.identifier, password: this.password })
        this.notify = {
          ...errorNotify,
          message: 'Enter valid email/username and password'
        }
        this.throttle = false
        return false
      }
      try {
        const { jwt } = await this.$api.login(this.identifier, this.password)
        localStorage.setItem(this.$constants.token, jwt.toString())
        await this.$socket.emit(this.$constants.auth, { data: jwt })
        await this.$router.replace({ name: 'home' })
      } catch (e) {
        console.log(e)
        this.notify = {
          ...errorNotify,
          message: 'Either email or password is wrong.'
        }
      }
      this.throttle = false
    },
    connectWithGoogle() {
      window.location.href = this.$store.state.config.server + '/connect/google'
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  background: #f2f2f2;
}
.card {
  box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
}
.__anchor {
  &:hover {
    color: rgb(47, 122, 172) !important;
  }
}
.q-card {
  width: 360px;
}
</style>
