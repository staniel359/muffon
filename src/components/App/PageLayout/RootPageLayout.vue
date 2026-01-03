<template>
  <TheOnlineObserver
    v-if="profileId"
  />

  <TheLoginObserver />

  <TheLogoutObserver />

  <TheAccountDeleteObserver />

  <TheNativeThemeObserver />

  <TheBackgroundObserver />

  <TheGuestPlayingObserver
    v-if="isGuest"
  />
  <ThePlayingObserver
    v-else-if="profileId"
  />

  <TheScrobbleObserver
    v-if="isRenderScrobbleObserver"
  />

  <TheBrowserObserver />

  <TheDiscordObserver />

  <TheDeepLinksObserver />

  <TheWindowObserver />

  <TheQuitObserver />

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
import sessionStore from '@/stores/session'

import TheLoginObserver
  from '@/components/layout/observers/TheLoginObserver.vue'
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
import TheDeepLinksObserver
  from '@/components/layout/observers/TheDeepLinksObserver.vue'
import TheWindowObserver
  from '@/components/layout/observers/TheWindowObserver.vue'
import TheQuitObserver
  from '@/components/layout/observers/TheQuitObserver.vue'
import TheRootBackground from '@/components/layout/TheRootBackground.vue'

const TheOnlineObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheOnlineObserver.vue'
    )
  )
const TheGuestPlayingObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheGuestPlayingObserver.vue'
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
    TheLoginObserver,
    TheLogoutObserver,
    TheAccountDeleteObserver,
    TheNativeThemeObserver,
    TheBackgroundObserver,
    TheGuestPlayingObserver,
    ThePlayingObserver,
    TheScrobbleObserver,
    TheBrowserObserver,
    TheDiscordObserver,
    TheDeepLinksObserver,
    TheWindowObserver,
    TheQuitObserver,
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
        profileId: 'id'
      }
    ),
    ...mapState(
      sessionStore,
      [
        'isGuest'
      ]
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
