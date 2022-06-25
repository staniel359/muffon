<template>
  <DisconnectButton
    v-if="isConnected"
    :lastfm-nickname="lastfmNickname"
    @success="handleDisconnect"
  />
  <ConnectButton
    v-else-if="token"
    :token="token"
  />
  <TokenButton
    v-else
    @token-change="handleTokenChange"
  />
</template>

<script>
import DisconnectButton from './ConnectOption/DisconnectButton.vue'
import ConnectButton from './ConnectOption/ConnectButton.vue'
import TokenButton from './ConnectOption/TokenButton.vue'

export default {
  name: 'ConnectOption',
  components: {
    DisconnectButton,
    ConnectButton,
    TokenButton
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
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.error-message)
  margin-bottom: 1em
</style>
