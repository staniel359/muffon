<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="green circular option-button"
        icon="spotify"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="connectText"
        :is-invertable="false"
        @click="handleClick"
      />
    </div>

    <div
      class="option-text"
      v-text="confirmText"
    />

    <BaseClearButton
      @click="handleClearButtonClick"
    />
  </div>

  <BaseInput
    v-model.trim="code"
    class="code-input"
  />
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import createSpotifyConnection
  from '@/helpers/actions/api/connection/spotify/create'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseInput,
    BaseClearButton
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
        code: this.code
      }
    }
  },
  watch: {
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    createSpotifyConnection,
    handleClick () {
      this.createSpotifyConnection(
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

<style lang="sass" scoped>
.code-input
  margin-top: 1em
</style>
