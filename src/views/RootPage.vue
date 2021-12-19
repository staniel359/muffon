<template>
  <ThePlayerObserver />

  <TheScrobblingObserver
    v-if="isPlayerWithScrobbling"
  />

  <TheLocalSaver />

  <template
    v-if="isProfileLoggedIn"
  >
    <TheOnlineObserver />

    <TheBrowserTabs />
  </template>
  <TheAuthentication v-else />
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import ThePlayerObserver from '@/layout/observers/ThePlayerObserver.vue'
import TheScrobblingObserver from '@/layout/observers/TheScrobblingObserver.vue'
import TheLocalSaver from '@/layout/savers/TheLocalSaver.vue'
import TheOnlineObserver from '@/layout/observers/TheOnlineObserver.vue'
import TheBrowserTabs from '@/layout/TheBrowserTabs.vue'
import TheAuthentication from '@/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    ThePlayerObserver,
    TheScrobblingObserver,
    TheLocalSaver,
    TheOnlineObserver,
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState('player', {
      isPlayerWithScrobbling: 'isWithScrobbling'
    }),
    ...mapState('profile', {
      isProfileLoggedIn: 'isLoggedIn'
    })
  },
  watch: {
    isProfileLoggedIn: {
      immediate: true,
      handler: 'handleIsProfileLoggedInChange'
    }
  },
  methods: {
    handleIsProfileLoggedInChange (value) {
      if (!value) {
        this.clearTabs()
      }
    },
    clearTabs () {
      ipcRenderer.send(
        'clear-tabs'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
