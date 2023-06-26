<template>
  <div class="main-settings-options-block">
    <ConnectOption
      :is-connected="isConnected"
      :lastfm-account-data="lastfmAccountData"
    />

    <ScrobbleOption
      :is-connected="isConnected"
      :is-player-with-scrobbling="isPlayerWithScrobbling"
    />

    <ScrobbleNotificationsOption
      :is-connected="isConnected"
      :is-player-with-scrobbling="isPlayerWithScrobbling"
    />

    <ScrobblePercentOption
      :is-connected="isConnected"
      :is-player-with-scrobbling="isPlayerWithScrobbling"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import ConnectOption from './LastfmOptions/ConnectOption.vue'
import ScrobbleOption from './LastfmOptions/ScrobbleOption.vue'
import ScrobbleNotificationsOption
  from './LastfmOptions/ScrobbleNotificationsOption.vue'
import ScrobblePercentOption from './LastfmOptions/ScrobblePercentOption.vue'

export default {
  name: 'LastfmOptions',
  components: {
    ConnectOption,
    ScrobbleOption,
    ScrobbleNotificationsOption,
    ScrobblePercentOption
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isConnected () {
      return !!this.lastfmAccountData
    },
    lastfmAccountData () {
      return this.profileConnections.lastfm
    }
  }
}
</script>

<style lang="sass" scoped></style>
