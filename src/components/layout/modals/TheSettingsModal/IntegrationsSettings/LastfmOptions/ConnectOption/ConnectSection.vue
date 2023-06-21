<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red circular option-button"
        icon="lastfm"
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
      v-text="waitText"
    />

    <BaseClearButton
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import createLastfmConnection
  from '@/helpers/actions/api/connection/lastfm/create'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseClearButton
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
    waitText () {
      return this.$t(
        'connections.confirm.token'
      )
    },
    connectionArgs () {
      return {
        lastfmToken: this.token
      }
    }
  },
  watch: {
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    createLastfmConnection,
    handleClick () {
      this.createLastfmConnection(
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
