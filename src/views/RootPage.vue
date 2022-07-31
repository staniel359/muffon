<template>
  <TheSessionObserver />

  <TheBackgroundObserver />

  <TheMediaKeysObserver />

  <ThePlayerObserver />

  <ThePlayingObserver />

  <TheScrobblingObserver
    v-if="isPlayerWithScrobbling"
  />

  <TheExitObserver />

  <TheElectronStoreSaver />

  <TheBrowserTabs
    v-if="profileId"
  />
  <TheAuthentication
    v-else
  />
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import TheSessionObserver
  from '*/components/layout/observers/TheSessionObserver.vue'
import TheBackgroundObserver
  from '*/components/layout/observers/TheBackgroundObserver.vue'
import TheMediaKeysObserver
  from '*/components/layout/observers/TheMediaKeysObserver.vue'
import ThePlayerObserver
  from '*/components/layout/observers/ThePlayerObserver.vue'
import ThePlayingObserver
  from '*/components/layout/observers/ThePlayingObserver.vue'
import TheScrobblingObserver
  from '*/components/layout/observers/TheScrobblingObserver.vue'
import TheExitObserver
  from '*/components/layout/observers/TheExitObserver.vue'
import TheElectronStoreSaver
  from '*/components/layout/savers/TheElectronStoreSaver.vue'
import TheBrowserTabs from '*/components/layout/TheBrowserTabs.vue'
import TheAuthentication from '*/components/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheSessionObserver,
    TheBackgroundObserver,
    TheMediaKeysObserver,
    ThePlayerObserver,
    ThePlayingObserver,
    TheScrobblingObserver,
    TheExitObserver,
    TheElectronStoreSaver,
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      'player',
      {
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
