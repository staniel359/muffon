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
  </div>
</template>

<script>
import {
  shell
} from 'electron'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import getLastfmToken from '*/helpers/actions/api/lastfm/connect/token/get'

export default {
  name: 'TokenButton',
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
        'accounts.connect'
      )
    },
    token () {
      return this.connectData?.token
    },
    link () {
      return this.connectData?.link
    }
  },
  watch: {
    token: 'handleTokenChange',
    link: 'handleLinkChange'
  },
  methods: {
    getLastfmToken,
    handleClick () {
      this.getLastfmToken()
    },
    handleTokenChange (
      value
    ) {
      this.$emit(
        'tokenChange',
        value
      )
    },
    handleLinkChange (
      value
    ) {
      shell.openExternal(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
