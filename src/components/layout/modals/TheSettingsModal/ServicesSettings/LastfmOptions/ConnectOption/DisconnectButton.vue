<template>
  <div class="disconnect-button-container">
    <BaseErrorMessage
      v-if="error"
      class="error-message"
      :error="error"
    />

    <div class="button-block-container">
      <BaseButton
        class="basic red"
        icon="lastfm"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="disconnectText"
        @click="handleClick"
      />

      <div>
        <strong
          class="nickname-block"
          v-text="lastfmNickname"
        />

        <BaseIcon
          class="green nickname-icon"
          icon="check"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import deleteLastfmSession
  from '*/helpers/actions/api/lastfm/connect/session/delete'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'DisconnectButton',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseIcon
  },
  props: {
    lastfmNickname: {
      type: String,
      required: true
    }
  },
  emits: [
    'success'
  ],
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    disconnectText () {
      return this.$t(
        'accounts.disconnect'
      )
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    deleteLastfmSession,
    handleClick () {
      this.deleteLastfmSession()
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

        this.$emit(
          'success'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.disconnect-button-container
  @extend .d-flex, .flex-column, .flex-full

.button-block-container
  @extend .d-flex, .align-items-center, .justify-content-space-between

.nickname-block
  margin-left: 1em

.nickname-icon
  margin-left: 0.5em
</style>
