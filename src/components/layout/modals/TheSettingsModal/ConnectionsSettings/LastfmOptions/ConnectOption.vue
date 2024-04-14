<template>
  <GetTokenSection
    v-if="status === 'getToken'"
    @token-get="handleTokenGet"
  />
  <ConnectTokenSection
    v-else-if="status === 'connectToken' && token"
    :token="token"
    @clear-button-click="handleClearButtonClick"
  />
  <ConnectedSection
    v-else-if="status === 'connected'"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import GetTokenSection from './ConnectOption/GetTokenSection.vue'
import ConnectTokenSection from './ConnectOption/ConnectTokenSection.vue'
import ConnectedSection from './ConnectOption/ConnectedSection.vue'

export default {
  name: 'ConnectOption',
  components: {
    GetTokenSection,
    ConnectedSection,
    ConnectTokenSection
  },
  data () {
    return {
      token: null,
      status: 'getToken'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    lastfmAccountData () {
      return this.profileConnections.lastfm
    }
  },
  watch: {
    lastfmAccountData: {
      immediate: true,
      handler: 'handleLastfmAccountDataChange'
    }
  },
  methods: {
    handleLastfmAccountDataChange (
      value
    ) {
      if (value) {
        this.status = 'connected'
      } else {
        this.reset()
      }
    },
    handleTokenGet (
      value
    ) {
      this.token = value

      this.status = 'connectToken'
    },
    handleClearButtonClick () {
      this.reset()
    },
    reset () {
      this.status = 'getToken'

      this.token = null
    }
  }
}
</script>

<style lang="sass" scoped></style>
