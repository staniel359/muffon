<template>
  <div class="main-settings-options-block">
    <BaseDivider
      text="Last.FM"
      isHorizontal
    />

    <ConnectOption
      :isConnected="isConnected"
      :lastfmNickname="lastfmNickname"
    />
    <ScrobbleOption
      :isConnected="isConnected"
      :isPlayerScrobbling="isPlayerScrobbling"
    />
    <ScrobbleNotificationsOption
      :isConnected="isConnected"
      :isPlayerScrobbling="isPlayerScrobbling"
    />
    <ScrobblePercentOption
      :isConnected="isConnected"
      :isPlayerScrobbling="isPlayerScrobbling"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseDivider from '@/BaseDivider.vue'
import ConnectOption from './LastfmOptions/ConnectOption.vue'
import ScrobbleOption from './LastfmOptions/ScrobbleOption.vue'
import ScrobbleNotificationsOption
  from './LastfmOptions/ScrobbleNotificationsOption.vue'
import ScrobblePercentOption from './LastfmOptions/ScrobblePercentOption.vue'

export default {
  name: 'LastfmOptions',
  components: {
    BaseDivider,
    ConnectOption,
    ScrobbleOption,
    ScrobbleNotificationsOption,
    ScrobblePercentOption
  },
  computed: {
    ...mapState('player', {
      isPlayerScrobbling: 'isScrobbling'
    }),
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    isConnected () {
      return !!(
        this.lastfmNickname &&
          this.lastfmSessionKey
      )
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
    },
    lastfmSessionKey () {
      return this.profileInfo.lastfm_session_key
    }
  }
}
</script>

<style lang="sass" scoped></style>
