<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="lastfm circular option-button"
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
import createLastfmSession
  from '@/helpers/actions/api/lastfm/connect/session/create'
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
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick'
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
