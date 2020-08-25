<template>
  <div v-if="render" class="row justify-center">
    <div class="q-pa-md" style="width: 600px; max-width: 80vw">
      <q-card flat bordered style="width: 100%">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="$config.server + profile.user.profile_photo.url" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-uppercase text-subtitle1 text-weight-bold">
                {{ profile.name }}
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-label caption>
            <div class="text-caption text-weight-bold text-justify">
              {{ profile.description }}
            </div>
          </q-item-label>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="q-pa-md">
              <q-carousel
                swipeable
                animated
                v-model="slide"
                thumbnails
                infinite
              >
                <q-carousel-slide
                  v-for="media in usermedia"
                  :key="media.id"
                  :name="media.id"
                  :img-src="$config.server + media.url"
                />
              </q-carousel>
            </div>

            <div class="row items-center justify-between no-wrap q-mt-md">
              <div class="row items-center cursor-pointer" @click="vote">
                <q-icon
                  :name="!favorite ? 'favorite_border' : 'favorite'"
                  :color="favorite ? 'red-7' : 'grey-5'"
                  class="q-mr-sm __favorite-icon"
                  size="25px"
                />
                <div class="text-subtitle1">{{ profile.votes }}</div>
              </div>

              <div class="row items-center cursor-pointer">
                <q-icon
                  name="chat_bubble_outline"
                  color="grey-5"
                  class="q-mr-sm"
                  size="20px"
                />
              </div>

              <div
                class="row items-center cursor-pointer"
                @click="share = !share"
              >
                <q-icon name="share" color="grey-5" size="25px" />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-card>
      <!-- Other Profiles -->
      <div class="text-h6 text-center q-ma-md">Other Top Profiles</div>
      <div class="q-pa-md" v-for="other in otherProfiles" :key="other.id">
        <q-card flat bordered style="width: 100%">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img
                  :src="$config.server + other.user.profile_photo.url"
                  :ratio="1"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="text-uppercase text-subtitle1 text-weight-bold">
                  {{ other.name }}
                </div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-caption text-weight-bold text-justify">
                  {{ other.description.substr(0, 70) }}...
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            :src="$config.server + other.user_media.files[0].url"
            :ratio="16 / 9"
          />
          <q-card-section class="row justify-end">
            <q-btn
              no-caps
              unelevated
              flat
              color="pink-6"
              :label="`Checkout ${other.user.fullname}'s profile`"
              @click="go(other.id)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <notify
      v-if="notify.allow"
      :data="notify"
      @notified="notify.allow = !notify.allow"
    />
  </div>
  <div
    v-else
    class="row bg-grey-2 full-width justify-center items-center __spinner"
  >
    <q-spinner color="primary" size="3em" :thickness="2" />
  </div>
</template>

<script>
import notify from '../../components/Notify'
export default {
  name: 'public-profile',
  components: {
    notify
  },
  data() {
    return {
      render: false,
      share: false,
      slide: 0,
      favorite: false,
      notify: {},
      profile: {},
      usermedia: [],
      otherProfiles: [],
      ipconfig: {},
      address: ''
    }
  },
  methods: {
    go(id) {
      this.$router.replace(id)
    },
    async fetch(id) {
      this.favorite = false
      try {
        this.profile = await this.$api.getPublicProfile(id)
        this.otherProfiles = await this.$api.getEventUserMedia(
          this.profile.event.slug,
          id
        )
        this.usermedia = this.profile.user_media.files
        this.slide = this.usermedia[0].id
        this.render = true
      } catch (e) {
        // this.$router.push({ name: 'error' })
        alert(e)
      }
    },
    async vote() {
      try {
        if (!this.favorite) {
          const payload = {
            address: this.address,
            ip: this.ipconfig.query,
            profile: this.profile,
            config: {
              is: this.$q.platform.is,
              userAgent: this.$q.platform.userAgent,
              ipconfig: this.ipconfig
            }
          }
          this.$socket.emit(this.$constants.vote, payload)
        }
      } catch (e) {
        this.favorite = false
        console.log(e)
      }
    }
  },
  async created() {
    const { id } = this.$router.currentRoute.params
    this.fetch(id)

    this.ipconfig = await this.$api.fetchIP()
    this.address = await this.$fingerprint()

    // Socket Events
    this.$socket.on(this.$constants.votesUpdated, data => {
      if (data.error) {
        this.favorite = false
        const errorNotify = {
          allow: true,
          color: 'red-7',
          icon: 'fas fa-vote-yea'
        }
        this.notify = {
          ...errorNotify,
          message: data.message,
          timeout: 2000
        }
        if (this.profile.id === data.profile) this.favorite = true
      } else {
        if (this.profile.id === data.profile) {
          this.profile.votes = data.votes
          this.favorite = true
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.__spinner {
  height: 100vh;
}
.__favorite {
  &-icon {
    transition: 0.3s;
    &:active {
      transform: scale(1.5);
    }
  }
}
</style>
