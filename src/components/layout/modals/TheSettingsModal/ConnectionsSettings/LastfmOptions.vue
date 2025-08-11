<template>
  <div class="main-settings-options-block">
    <ConnectOption />

    <template
      v-if="isConnected"
    >
      <ScrobbleOption />

      <ScrobbleNotificationsOption />

      <ScrobblePercentOption />
    </template>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
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
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isConnected () {
      return !!this.lastfmAccountData
    },
    lastfmAccountData () {
      return this.profileConnections?.lastfm
    }
  }
}
</script>

<style lang="sass" scoped></style>
