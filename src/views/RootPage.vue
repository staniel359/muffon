<template>
  <TheSessionObserver />

  <TheNativeThemeObserver />

  <TheBackgroundObserver />

  <TheMediaKeysObserver />

  <ThePlayingObserver />

  <TheExitObserver />

  <TheExternalUrlsObserver />

  <TheElectronStoreSaver />

  <TheBrowserTabs
    v-if="isRenderBrowserTabs"
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
  from '@/components/layout/observers/TheSessionObserver.vue'
import TheNativeThemeObserver
  from '@/components/layout/observers/TheNativeThemeObserver.vue'
import TheBackgroundObserver
  from '@/components/layout/observers/TheBackgroundObserver.vue'
import TheMediaKeysObserver
  from '@/components/layout/observers/TheMediaKeysObserver.vue'
import ThePlayingObserver
  from '@/components/layout/observers/ThePlayingObserver.vue'
import TheExitObserver
  from '@/components/layout/observers/TheExitObserver.vue'
import TheExternalUrlsObserver
  from '@/components/layout/observers/TheExternalUrlsObserver.vue'
import TheElectronStoreSaver
  from '@/components/layout/savers/TheElectronStoreSaver.vue'
import TheBrowserTabs from '@/components/layout/TheBrowserTabs.vue'
import TheAuthentication from '@/components/layout/TheAuthentication.vue'

export default {
  name: 'RootPage',
  components: {
    TheSessionObserver,
    TheNativeThemeObserver,
    TheBackgroundObserver,
    TheMediaKeysObserver,
    ThePlayingObserver,
    TheExitObserver,
    TheExternalUrlsObserver,
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
      'profile',
      {
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    isRenderBrowserTabs () {
      return (
        this.isProfileAnonymous ||
          this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
