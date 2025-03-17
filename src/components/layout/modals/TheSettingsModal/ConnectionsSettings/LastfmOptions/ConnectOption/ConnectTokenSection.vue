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

    <BaseMessage
      :content="confirmText"
      is-info
    />

    <div class="main-settings-option main-bottom-section">
      <BaseSettingsOptionButton
        :text="connectText"
        :is-loading="isLoading"
        is-lastfm
        @click="handleClick"
      />

      <BaseClearButton
        @click="handleClearButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import createConnection from '@/helpers/actions/api/connection/create'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectTokenSection',
  components: {
    BaseErrorMessage,
    BaseSettingsOptionButton,
    BaseClearButton,
    BaseMessage
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  emits: [
    'clearButtonClick'
  ],
  data () {
    return {
      connectionsData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    connectText () {
      return this.$t(
        'connections.connect'
      )
    },
    confirmText () {
      return this.$t(
        'connections.confirm.token'
      )
    },
    connectionArgs () {
      return {
        source: 'lastfm',
        token: this.token
      }
    }
  },
  watch: {
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    createConnection,
    handleClick () {
      this.createConnection(
        this.connectionArgs
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick'
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
