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
          class="red circular option-button"
          left-icon="lastfm"
          :class="{
            loading: isLoading,
            disabled: isLoading
          }"
          :text="connectText"
          :is-invertable="false"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  shell
} from 'electron'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import getToken from '@/helpers/actions/api/connection/token/get'

export default {
  name: 'TokenSection',
  components: {
    BaseErrorMessage,
    BaseButton
  },
  emits: [
    'tokenChange'
  ],
  data () {
    return {
      connectData: null,
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
    tokenArgs () {
      return {
        source: 'lastfm'
      }
    }
  },
  watch: {
    connectData: 'handleConnectDataChange'
  },
  methods: {
    getToken,
    handleClick () {
      this.getToken(
        this.tokenArgs
      )
    },
    handleConnectDataChange (
      value
    ) {
      shell.openExternal(
        value.link
      )

      this.$emit(
        'tokenChange',
        value.token
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
