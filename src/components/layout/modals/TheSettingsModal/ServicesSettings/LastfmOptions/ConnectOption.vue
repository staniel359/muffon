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
        :text="connectText"
        @click="handleClick"
      />
    </div>

    <strong
      v-if="lastfmNickname"
      class="connect-nickname"
      v-text="lastfmNickname"
    />
  </div>

  <div
    v-if="isShowWaitMessage"
    class="connect-wait-message"
    v-text="waitText"
  />
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import getLastfmToken from '*/helpers/actions/api/lastfm/connect/token/get'
import getLastfmSession from '*/helpers/actions/api/lastfm/connect/session/get'

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
      isLoading: false,
      isShowWaitMessage: false
    }
  },
  computed: {
    connectText () {
      return this.$t(
        `accounts.${this.connectTextKey}`
      )
    },
    connectTextKey () {
      return this.isConnected
        ? 'connected'
        : 'connect'
    },
    waitText () {
      return this.$t(
        'accounts.wait'
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

        this.getLastfmSession(
          {
            token: this.token
          }
        )
      } else {
        this.getLastfmToken()
      }
    },
    getLastfmToken,
    getLastfmSession
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
