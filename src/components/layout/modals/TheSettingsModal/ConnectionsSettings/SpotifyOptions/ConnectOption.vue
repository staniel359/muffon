<template>
  <ConnectedSection
    v-if="isConnected"
    :spotify-account-data="spotifyAccountData"
    @success="handleDisconnect"
  />
  <ConnectSection
    v-else-if="isCodeCalled"
    @clear-button-click="handleCodeClearButtonClick"
  />
  <CodeSection
    v-else
    @code-called="handleCodeCalled"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import ConnectedSection from './ConnectOption/ConnectedSection.vue'
import ConnectSection from './ConnectOption/ConnectSection.vue'
import CodeSection from './ConnectOption/CodeSection.vue'

export default {
  name: 'ConnectOption',
  components: {
    ConnectedSection,
    ConnectSection,
    CodeSection
  },
  data () {
    return {
      isCodeCalled: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isConnected () {
      return !!this.spotifyAccountData
    },
    spotifyAccountData () {
      return this.profileConnections.spotify
    }
  },
  methods: {
    handleCodeCalled (
      value
    ) {
      this.isCodeCalled = true
    },
    handleDisconnect () {
      this.isCodeCalled = false
    },
    handleCodeClearButtonClick () {
      this.isCodeCalled = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
