<template>
  <ConnectedSection
    v-if="isConnected"
    :lastfm-account-data="lastfmAccountData"
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
import ConnectedSection from './ConnectOption/ConnectedSection.vue'
import ConnectSection from './ConnectOption/ConnectSection.vue'
import TokenSection from './ConnectOption/TokenSection.vue'

export default {
  name: 'ConnectOption',
  components: {
    ConnectedSection,
    ConnectSection,
    TokenSection
  },
  props: {
    isConnected: Boolean,
    lastfmAccountData: Object
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

<style lang="sass" scoped></style>
