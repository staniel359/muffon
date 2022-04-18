<template>
  <TheScrobblingObserver
    v-if="isPlayerWithScrobbling"
  />

  <TheSessionObserver />

  <TheExitObserver />

  <TheElectronStoreSaver />

  <TheBrowserTabs
    v-if="profileInfo"
  />
  <TheAuthentication v-else />
</template>

<script>
import {
  mapState
} from 'vuex'
import TheScrobblingObserver
  from '*/components/layout/observers/TheScrobblingObserver.vue'
import TheSessionObserver
  from '*/components/layout/observers/TheSessionObserver.vue'
import TheExitObserver
  from '*/components/layout/observers/TheExitObserver.vue'
import TheElectronStoreSaver
  from '*/components/layout/savers/TheElectronStoreSaver.vue'
import TheBrowserTabs from '*/components/layout/TheBrowserTabs.vue'
import TheAuthentication from '*/components/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheScrobblingObserver,
    TheSessionObserver,
    TheExitObserver,
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
        profileInfo: 'info'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
