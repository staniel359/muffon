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
        :text="connectText"
        :is-loading="isLoading"
        is-lastfm
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'
import getToken from '@/helpers/actions/api/connection/token/get'

export default {
  name: 'GetTokenSection',
  components: {
    BaseErrorMessage,
    BaseSettingsOptionButton
  },
  emits: [
    'tokenGet'
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
      const {
        link,
        token
      } = value

      window
        .mainProcess
        .openExternalLink(
          link
        )

      this.$emit(
        'tokenGet',
        token
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
