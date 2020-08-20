<template>
  <div v-if="render" class="row justify-center">
    <div class="q-pa-md">
      <q-card flat bordered style="width: 600px; max-width: 80vw;">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
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
            <q-img
              src="https://wallpapercave.com/wp/47fyfEm.jpg"
              style="width: 100%"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ profile.event.name }}
              </div>
            </q-img>

            <div class="row items-center justify-between no-wrap q-mt-md">
              <div class="row items-center cursor-pointer">
                <q-icon
                  name="favorite_border"
                  color="grey-5"
                  class="q-mr-sm"
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
      <div class="q-pa-md" v-for="i in 2" :key="i">
        <q-card flat bordered style="width: 100%">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" animation="fade" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-skeleton height="200px" square animation="fade" />
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle2" animation="fade" />
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle2"
              animation="fade"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div
    v-else
    class="row bg-grey-2 full-width justify-center items-center __spinner"
  >
    <q-spinner color="primary" size="3em" :thickness="2" />
  </div>
</template>

<script>
export default {
  name: 'public-profile',
  data() {
    return {
      render: false,
      error: false,
      share: false,
      profile: {}
    }
  },
  async mounted() {
    const { id } = this.$router.currentRoute.params
    try {
      this.profile = await this.$api.getPublicProfile(id)
      console.log(this.profile)
      this.render = true
    } catch (e) {
      this.$router.push({ name: 'error' })
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.__spinner {
  height: 100vh;
}
</style>
