<template>
  <q-page class="overflow">
    <q-breadcrumbs class="text-grey">
      <template v-slot:separator>
        <q-icon size="1.2em" name="arrow_forward" />
      </template>

      <q-breadcrumbs-el
        class="cursor-pointer"
        label="Home"
        icon="home"
        @click="$router.push({ name: 'home' })"
      />
      <q-breadcrumbs-el label="Settings" icon="settings" />
    </q-breadcrumbs>
    <div class="q-mt-xl card" v-if="render">
      <q-card flat class="__profile">
        <q-card-section class="__section">
          <div class="__info">
            <div class="__avatar">
              <q-img
                v-if="user.profile_photo"
                :src="$config.server + user.profile_photo.formats.thumbnail.url"
                class="q-mr-lg cursor-pointer __avatar-img"
                native-context-menu
              />
              <q-img
                v-else-if="user.profile_photo_social"
                :src="user.profile_photo_social"
                class="q-mr-lg cursor-pointer __avatar-img"
                native-context-menu
              />
              <q-img
                v-else
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                class="q-mr-lg cursor-pointer __avatar-img"
                native-context-menu
              />
              <q-btn
                round
                icon="add"
                color="primary"
                class="absolute"
                size="xs"
                @click="openMediaManager = !openMediaManager"
                style="transform: translateX(-40px) translateY(40px);"
              >
                <q-tooltip>Change Profile Picture</q-tooltip>
              </q-btn>
            </div>
            <div class="text-h6 text-grey-9 text-uppercase">
              {{ user.fullname ? user.fullname : user.email }}
            </div>
          </div>
          <q-btn
            ripple
            flat
            class="text-subtitle1 cursor-pointer text-grey-7 __btn-logout"
            @click="logout"
          >
            logout
          </q-btn>
        </q-card-section>
      </q-card>
      <div class="spacer" />
      <div class="row justify-between">
        <span class="text-h6 text-grey-9 text-uppercase">Profile</span>
        <q-btn color="primary" label="Save" outline @click="updateUser"></q-btn>
      </div>
      <q-list class="list">
        <q-item class="__item">
          <q-item-section>
            <q-input
              dense
              v-model="user.fullname"
              label="Full Name"
              class="__input"
            />
            <q-input
              dense
              v-model="user.username"
              label="Username"
              class="__input"
            />
          </q-item-section>
        </q-item>
        <div class="__item q-pa-md text-blue-7 cursor-pointer" @click="changePassword = !changePassword"> Change Password ?</div>
        <q-item class="__item" v-if="changePassword">
          <q-item-section>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input
                  dense
                  :type="eye ? 'text' : 'password'"
                  v-model="auth.password"
                  label="Password"
                  class="full-width __input"
                >
                  <template v-slot:append>
                    <q-icon
                      name="remove_red_eye"
                      class="cursor-pointer"
                      @click="eye = !eye"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  dense
                  type="password"
                  v-model="auth.confirmPassword"
                  label="Confirm Password"
                  class="full-width __input"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="
                        !!auth.password &&
                        auth.password === auth.confirmPassword
                          ? 'check_circle'
                          : 'cancel'
                      "
                      class="text-red-7"
                      :class="[
                        {
                          'text-green-7':
                            !!auth.password &&
                            auth.password === auth.confirmPassword
                        }
                      ]"
                      @click="eye = !eye"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row justify-end">
              <q-btn color="primary" label="Update" outline @click="updateUser"></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="spacer" />
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'settings',
  data() {
    return {
      render: false,
      eye: false,
      changePassword: false,
      user: {},
      auth: {
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async updateUser() {
      const data = await this.$api.updateUser(this.user)
      this.$store.dispatch('user/updateuser', data)
      if (this.changePassword && this.auth.password === this.auth.confirmPassword) {
        this.$socket.emit(this.$constants.change_password, {
          data: localStorage.getItem(this.$constants.token),
          auth: this.auth.password
        })
        this.auth.password = ''
        this.auth.confirmPassword = ''
      }
    },
    async logout() {
      await localStorage.removeItem(this.$constants.token)
      await this.$store.dispatch('user/buildstate', {
        status: this.$constants.unauthorized,
        data: null
      })
      await this.$router.replace({ name: 'auth' })
    }
  },
  mounted() {
    this.user = { ...this.$user.data }
    this.render = true

    this.$socket.on(this.$constants.changed_password, (data) => {
      console.log('change password', data)
    })
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  width: 75%;
  & .__profile > .__section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;
    padding: 1rem;
    & .__info {
      display: flex;
      flex: 1;
      align-items: center;
      & .__avatar {
        margin-right: 10px;
        &-img {
          height: 4rem;
          width: 4rem;
          border-radius: 2rem;
        }
      }
    }
    & .__btn-logout {
      background: #e0e0e0;
    }
  }
}
.list {
  & .__item {
    background: #f2f2f2;
    border-radius: 10px;
    margin: 1.4rem 0;
    padding-bottom: 1rem;
    & .__input {
      background: transparent;
      padding: 10px;
      font-size: 14px;
      outline: none;
    }
  }
}
.spacer {
  margin: 2rem;
}
</style>
