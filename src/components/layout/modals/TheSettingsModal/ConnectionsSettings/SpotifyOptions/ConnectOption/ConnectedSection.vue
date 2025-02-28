<template>
  <div class="main-settings-option-container">
    <div
      v-if="error"
      class="main-top-section"
    >
      <BaseErrorMessage
        :error="error"
      />
    </div>

    <div class="main-settings-option">
      <BaseSettingsOptionButton
        :text="disconnectText"
        :is-loading="isLoading"
        is-spotify
        is-basic
        @click="handleClick"
      />

      <BaseAccountSection
        :account-data="spotifyAccountData"
      />
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'
import BaseAccountSection from '@/components/sections/BaseAccountSection.vue'
import deleteConnection from '@/helpers/actions/api/connection/delete'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectedSection',
  components: {
    BaseErrorMessage,
    BaseSettingsOptionButton,
    BaseAccountSection
  },
  props: {
    spotifyAccountData: Object
  },
  data () {
    return {
      connectionsData: null,
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    disconnectText () {
      return this.$t(
        'connections.disconnect'
      )
    },
    connectionArgs () {
      return {
        source: 'spotify'
      }
    }
  },
  watch: {
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    deleteConnection,
    handleClick () {
      this.deleteConnection(
        this.connectionArgs
      )
    },
    handleConnectionsDataChange (
      value
    ) {
      if (value) {
        updateGlobalStore(
          {
            'profile.connections': value
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
