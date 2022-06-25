<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="lastfm option-button"
        icon="lastfm"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="connectText"
        @click="handleClick"
      />
    </div>

    <div
      class="option-text"
      v-text="waitText"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import createLastfmSession
  from '*/helpers/actions/api/lastfm/connect/session/create'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'ConnectButton',
  components: {
    BaseErrorMessage,
    BaseButton
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    connectText () {
      return this.$t(
        'accounts.connect'
      )
    },
    waitText () {
      return this.$t(
        'accounts.wait'
      )
    },
    sessionArgs () {
      return {
        lastfmToken: this.token
      }
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    createLastfmSession,
    handleClick () {
      this.createLastfmSession(
        this.sessionArgs
      )
    },
    handleProfileDataChange (
      value
    ) {
      if (value) {
        updateGlobalStore(
          {
            'profile.info': value
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
