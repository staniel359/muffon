<template>
  <TheScrobblingObserver
    v-if="isPlayerWithScrobbling"
  />

  <TheOnlineObserver />

  <TheElectronStoreSaver />

  <TheBrowserTabs
    v-if="isProfileLoggedIn"
  />
  <TheAuthentication v-else />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import TheScrobblingObserver
  from '*/components/layout/observers/TheScrobblingObserver.vue'
import TheOnlineObserver
  from '*/components/layout/observers/TheOnlineObserver.vue'
import TheElectronStoreSaver
  from '*/components/layout/savers/TheElectronStoreSaver.vue'
import TheBrowserTabs from '*/components/layout/TheBrowserTabs.vue'
import TheAuthentication from '*/components/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheScrobblingObserver,
    TheOnlineObserver,
    TheElectronStoreSaver,
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState(
      'player',
      {
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    ...mapState(
      'profile',
      {
        isProfileLoggedIn: 'isLoggedIn'
      }
    )
  },
  watch: {
    isProfileLoggedIn: {
      immediate: true,
      handler: 'handleIsProfileLoggedInChange'
    }
  },
  methods: {
    handleIsProfileLoggedInChange (
      value
    ) {
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
