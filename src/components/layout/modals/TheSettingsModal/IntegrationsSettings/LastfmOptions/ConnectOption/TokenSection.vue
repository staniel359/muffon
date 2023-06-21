<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red circular option-button"
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
  </div>
</template>

<script>
import {
  shell
} from 'electron'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import getLastfmToken from '@/helpers/actions/api/connection/lastfm/token/get'

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
    }
  },
  watch: {
    connectData: 'handleConnectDataChange'
  },
  methods: {
    getLastfmToken,
    handleClick () {
      this.getLastfmToken()
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
