<template>
  <ConnectSection
    v-if="status === 'connect'"
    @connect-button-click="handleConnectButtonClick"
  />
  <LinkSection
    v-else-if="status === 'link'"
    @open-link-button-click="handleOpenLinkButtonClick"
    @clear-button-click="handleClearButtonClick"
  />
  <CodeSection
    v-else-if="status === 'code'"
    :client-id="clientId"
    :client-secret="clientSecret"
    @clear-button-click="handleClearButtonClick"
  />
  <ConnectedSection
    v-else-if="status === 'connected'"
    :spotify-account-data="spotifyAccountData"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import ConnectSection from './ConnectOption/ConnectSection.vue'
import LinkSection from './ConnectOption/LinkSection.vue'
import CodeSection from './ConnectOption/CodeSection.vue'
import ConnectedSection from './ConnectOption/ConnectedSection.vue'

export default {
  name: 'ConnectOption',
  components: {
    ConnectSection,
    LinkSection,
    CodeSection,
    ConnectedSection
  },
  data () {
    return {
      clientId: null,
      clientSecret: null,
      status: 'connect'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    spotifyAccountData () {
      return this.profileConnections.spotify
    }
  },
  watch: {
    spotifyAccountData: {
      immediate: true,
      handler: 'handleSpotifyAccountDataChange'
    }
  },
  methods: {
    handleConnectButtonClick () {
      this.status = 'link'
    },
    handleOpenLinkButtonClick (
      {
        clientId,
        clientSecret
      }
    ) {
      this.clientId = clientId
      this.clientSecret = clientSecret

      this.status = 'code'
    },
    handleClearButtonClick () {
      this.status = 'connect'
    },
    handleSpotifyAccountDataChange (
      value
    ) {
      if (value) {
        this.status = 'connected'
      } else {
        this.status = 'connect'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
