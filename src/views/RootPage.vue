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
import TheScrobblingObserver
  from '*/components/layout/observers/TheScrobblingObserver.vue'
import TheOnlineObserver
  from '*/components/layout/observers/TheOnlineObserver.vue'
import TheLocalSaver from '*/components/layout/savers/TheLocalSaver.vue'
import TheBrowserTabs from '*/components/layout/TheBrowserTabs.vue'
import TheAuthentication from '*/components/layout/TheAuthentication.vue'

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
