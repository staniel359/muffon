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
        is-lastfm
        is-basic
        @click="handleClick"
      />

      <BaseAccountSection
        :account-data="lastfmAccountData"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
  emits: [
    'success'
  ],
  data () {
    return {
      connectionsData: null,
      error: null,
      isLoading: false,
      isSuccess: false
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
      return this.profileConnections?.lastfm
    },
    disconnectText () {
      return this.$t(
        'connections.disconnect'
      )
    },
    connectionArgs () {
      return {
        source: 'lastfm'
      }
    }
  },
  watch: {
    connectionsData: 'handleConnectionsDataChange'
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

        this.$emit(
          'success'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
