<template>
  <DisconnectSection
    v-if="isConnected"
    :lastfm-nickname="lastfmNickname"
    @success="handleDisconnect"
  />
  <ConnectSection
    v-else-if="token"
    :token="token"
    @clear-button-click="handleTokenClearButtonClick"
  />
  <TokenSection
    v-else
    @token-change="handleTokenChange"
  />
</template>

<script>
import DisconnectSection from './ConnectOption/DisconnectSection.vue'
import ConnectSection from './ConnectOption/ConnectSection.vue'
import TokenSection from './ConnectOption/TokenSection.vue'

export default {
  name: 'ConnectOption',
  components: {
    DisconnectSection,
    ConnectSection,
    TokenSection
  },
  props: {
    isConnected: Boolean,
    lastfmNickname: String
  },
  data () {
    return {
      token: null
    }
  },
  methods: {
    handleTokenChange (
      value
    ) {
      this.token = value
    },
    handleDisconnect () {
      this.token = null
    },
    handleTokenClearButtonClick () {
      this.token = null
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.error-message)
  margin-bottom: 1em !important
</style>
