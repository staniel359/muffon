<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="basic circular red option-button"
        icon="lastfm"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="disconnectText"
        :is-invertable="false"
        @click="handleClick"
      />
    </div>

    <div>
      <BaseIcon
        icon="green check"
      />

      <strong
        v-text="lastfmNickname"
      />
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

<style lang="sass" scoped></style>
