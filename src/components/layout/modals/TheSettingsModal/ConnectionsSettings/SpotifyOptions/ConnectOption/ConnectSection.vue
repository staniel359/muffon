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
      <div class="option-header">
        <BaseButton
          class="green circular option-button"
          left-icon="spotify"
          :class="{
            loading: isLoading,
            disabled: isLoading
          }"
          :text="connectText"
          :is-invertable="false"
          @click="handleClick"
        />
      </div>

      <BaseClearButton
        @click="handleClearButtonClick"
      />
    </div>

    <div class="main-bottom-section">
      <BaseMessage
        :content="confirmText"
      />
    </div>

    <BaseInput
      v-model.trim="code"
      class="fluid main-bottom-section"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import createConnection from '@/helpers/actions/api/connection/create'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseInput,
    BaseClearButton,
    BaseMessage
  },
  emits: [
    'clearButtonClick'
  ],
  data () {
    return {
      connectionsData: null,
      error: null,
      isLoading: false,
      code: ''
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
        'connections.confirm.code'
      )
    },
    connectionArgs () {
      return {
        source: 'spotify',
        spotifyCode: this.code
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
