<template>
  <TheScrobblingObserver
    v-if="isPlayerWithScrobbling"
  />

  <TheOnlineObserver />

  <TheLocalSaver />

  <TheBrowserTabs
    v-if="isProfileLoggedIn"
  />
  <TheAuthentication v-else />
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import TheScrobblingObserver from '@/layout/observers/TheScrobblingObserver.vue'
import TheOnlineObserver from '@/layout/observers/TheOnlineObserver.vue'
import TheLocalSaver from '@/layout/savers/TheLocalSaver.vue'
import TheBrowserTabs from '@/layout/TheBrowserTabs.vue'
import TheAuthentication from '@/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheScrobblingObserver,
    TheOnlineObserver,
    TheLocalSaver,
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
