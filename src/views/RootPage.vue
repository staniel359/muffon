<template>
  <TheOnlineObserver
    v-if="profileId"
  />

  <TheLogoutObserver />

  <TheAccountDeleteObserver />

  <TheNativeThemeObserver />

  <TheBackgroundObserver />

  <TheAnonymousPlayingObserver
    v-if="isProfileAnonymous"
  />
  <ThePlayingObserver
    v-else-if="profileId"
  />

  <ThePlayingPublicObserver
    v-if="isRenderPlayingPublicObserver"
  />

  <TheAnonymousBrowserObserver
    v-if="isProfileAnonymous"
  />
  <TheBrowserObserver
    v-else-if="profileId"
  />

  <TheDiscordObserver
    v-if="isPlayerWithDiscordRichPresence"
  />

  <TheExitObserver />

  <TheExternalUrlsObserver />

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
import TheAnonymousPlayingObserver
  from '@/components/layout/observers/TheAnonymousPlayingObserver.vue'
import ThePlayingObserver
  from '@/components/layout/observers/ThePlayingObserver.vue'
import ThePlayingPublicObserver
  from '@/components/layout/observers/ThePlayingPublicObserver.vue'
import TheAnonymousBrowserObserver
  from '@/components/layout/observers/TheAnonymousBrowserObserver.vue'
import TheBrowserObserver
  from '@/components/layout/observers/TheBrowserObserver.vue'
import TheDiscordObserver
  from '@/components/layout/observers/TheDiscordObserver.vue'
import TheExitObserver
  from '@/components/layout/observers/TheExitObserver.vue'
import TheExternalUrlsObserver
  from '@/components/layout/observers/TheExternalUrlsObserver.vue'
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
    TheAnonymousPlayingObserver,
    ThePlayingObserver,
    ThePlayingPublicObserver,
    TheAnonymousBrowserObserver,
    TheBrowserObserver,
    TheDiscordObserver,
    TheExitObserver,
    TheExternalUrlsObserver,
    TheBrowserTabs,
    TheAuthentication
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithDiscordRichPresence:
          'isWithDiscordRichPresence',
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous',
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    isRenderPlayingPublicObserver () {
      return (
        this.profileId &&
          this.playerPlaying &&
          this.isShowProfilePlaying
      )
    },
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
