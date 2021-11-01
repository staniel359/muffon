<template>
  <BaseError
    v-if="error"
    class="connect-error-message"
    :error="error"
    :isWithButton="false"
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

      <i class="green check icon connect-success-icon"></i>
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
import { mapState } from 'vuex'
import BaseError from '@/BaseError.vue'
import BaseButton from '@/BaseButton.vue'
import fetchLastfmTokenData from '#/actions/api/lastfm/connect/token/fetchData'
import fetchLastfmSessionData
  from '#/actions/api/lastfm/connect/session/fetchData'

export default {
  name: 'LastfmOption',
  components: {
    BaseError,
    BaseButton
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
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
    isConnected () {
      return (
        this.lastfmNickname &&
          this.lastfmSessionKey
      )
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
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
    },
    lastfmSessionKey () {
      return this.profileInfo.lastfm_session_key
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

.connect-success-icon
  margin-left: 0.5em

.connect-wait-message
  margin-top: 0.5em
</style>
