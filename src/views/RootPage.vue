<template>
  <TheOnlineObserver
    v-if="profileId"
  />

  <TheLogoutObserver />

  <TheAccountDeleteObserver />

  <TheNativeThemeObserver />

  <TheBackgroundObserver />

  <ThePlayingObserver />

  <TheDiscordObserver
    v-if="isPlayerWithDiscordRichPresence"
  />

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
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import TheOnlineObserver
  from '@/components/layout/observers/TheOnlineObserver.vue'
import TheLogoutObserver
  from '@/components/layout/observers/TheLogoutObserver.vue'
import TheAccountDeleteObserver
  from '@/components/layout/observers/TheAccountDeleteObserver.vue'
import TheNativeThemeObserver
  from '@/components/layout/observers/TheNativeThemeObserver.vue'
import TheBackgroundObserver
  from '@/components/layout/observers/TheBackgroundObserver.vue'
import ThePlayingObserver
  from '@/components/layout/observers/ThePlayingObserver.vue'
import TheDiscordObserver
  from '@/components/layout/observers/TheDiscordObserver.vue'
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
    TheOnlineObserver,
    TheLogoutObserver,
    TheAccountDeleteObserver,
    TheNativeThemeObserver,
    TheBackgroundObserver,
    ThePlayingObserver,
    TheDiscordObserver,
    TheExitObserver,
    TheExternalUrlsObserver,
    TheElectronStoreSaver,
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithDiscordRichPresence:
          'isWithDiscordRichPresence'
      }
    ),
    ...mapState(
      profileStore,
      {
        isProfileAnonymous: 'isAnonymous',
        profileId: 'id'
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
