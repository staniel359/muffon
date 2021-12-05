<template>
  <BaseErrorMessage
    v-if="error"
    class="connect-error-message"
    :error="error"
  />

  <div class="content">
    <div class="connect-button-container">
      <BaseButton
        class="lastfm"
        icon="lastfm"
        :class="{
          loading: isLoading,
          disabled: isDisabled
        }"
        :text="buttonTextFormatted"
        @click="handleClick"
      />
    </div>

    <strong
      v-if="lastfmNickname"
      class="connect-nickname"
    >
      {{ lastfmNickname }}
    </strong>
  </div>

  <div
    v-if="isShowWaitMessage"
    class="connect-wait-message"
  >
    {{ waitMessageFormatted }}
  </div>
</template>

<script>
import BaseErrorMessage from '@/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import fetchLastfmTokenData from '#/actions/api/lastfm/connect/token/fetchData'
import fetchLastfmSessionData
  from '#/actions/api/lastfm/connect/session/fetchData'

export default {
  name: 'ConnectOption',
  components: {
    BaseErrorMessage,
    BaseButton
  },
  props: {
    isConnected: Boolean,
    lastfmNickname: String
  },
  data () {
    return {
      error: null,
      token: null,
      userData: null,
      isLoading: false,
      isShowWaitMessage: false
    }
  },
  computed: {
    buttonTextFormatted () {
      if (this.isConnected) {
        return this.$t(
          'layout.settings.options.services.lastfm.connected'
        )
      } else {
        return this.$t(
          'layout.settings.options.services.lastfm.connect'
        )
      }
    },
    waitMessageFormatted () {
      return this.$t(
        'layout.settings.options.services.lastfm.wait'
      )
    },
    isDisabled () {
      return (
        this.isLoading ||
          this.isConnected
      )
    }
  },
  methods: {
    handleClick () {
      if (this.token) {
        this.isShowWaitMessage = false

        this.fetchLastfmSessionData({
          token: this.token
        })
      } else {
        this.fetchLastfmTokenData()
      }
    },
    fetchLastfmTokenData,
    fetchLastfmSessionData
  }
}
</script>

<style lang="sass" scoped>
.connect-error-message
  margin-bottom: 0.5em

.connect-button-container
  @extend .flex-full

.connect-nickname
  margin-left: 1em

.connect-wait-message
  margin-top: 0.5em
</style>
