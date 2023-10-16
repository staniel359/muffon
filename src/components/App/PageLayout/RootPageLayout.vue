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

  <TheScrobbleObserver
    v-if="isRenderScrobbleObserver"
  />

  <TheAnonymousBrowserObserver
    v-if="isProfileAnonymous"
  />
  <TheBrowserObserver
    v-else-if="profileId"
  />

  <TheDiscordObserver />

  <TheExternalUrlsObserver />

  <TheDeepLinksObserver />

  <TheExitObserver />

  <TheRootBackground />

  <div class="ui container main-container main-view">
    <RouterView />
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import TheLogoutObserver
  from '@/components/layout/observers/TheLogoutObserver.vue'
import TheAccountDeleteObserver
  from '@/components/layout/observers/TheAccountDeleteObserver.vue'
import TheNativeThemeObserver
  from '@/components/layout/observers/TheNativeThemeObserver.vue'
import TheBackgroundObserver
  from '@/components/layout/observers/TheBackgroundObserver.vue'
import TheDiscordObserver
  from '@/components/layout/observers/TheDiscordObserver.vue'
import TheExternalUrlsObserver
  from '@/components/layout/observers/TheExternalUrlsObserver.vue'
import TheDeepLinksObserver
  from '@/components/layout/observers/TheDeepLinksObserver.vue'
import TheExitObserver
  from '@/components/layout/observers/TheExitObserver.vue'
import TheRootBackground from '@/components/layout/TheRootBackground.vue'

const TheOnlineObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheOnlineObserver.vue'
    )
  )
const TheAnonymousPlayingObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheAnonymousPlayingObserver.vue'
    )
  )
const ThePlayingObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/ThePlayingObserver.vue'
    )
  )
const TheScrobbleObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheScrobbleObserver.vue'
    )
  )
const TheAnonymousBrowserObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheAnonymousBrowserObserver.vue'
    )
  )
const TheBrowserObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheBrowserObserver.vue'
    )
  )

export default {
  name: 'RootPageLayout',
  components: {
    TheOnlineObserver,
    TheLogoutObserver,
    TheAccountDeleteObserver,
    TheNativeThemeObserver,
    TheBackgroundObserver,
    TheAnonymousPlayingObserver,
    ThePlayingObserver,
    TheScrobbleObserver,
    TheAnonymousBrowserObserver,
    TheBrowserObserver,
    TheDiscordObserver,
    TheExternalUrlsObserver,
    TheDeepLinksObserver,
    TheExitObserver,
    TheRootBackground
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithScrobbling:
          'isWithScrobbling'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    isRenderScrobbleObserver () {
      return (
        this.profileId &&
          this.isPlayerWithScrobbling &&
          this.playerPlaying
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
