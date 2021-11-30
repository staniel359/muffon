<template>
  <BaseButton
    class="primary import-button"
    icon="user circle"
    :class="{ disabled: !isAccountConnected }"
    :text="addFormatted"
    @click="handleClick"
  />

  <AccountImportModal
    v-if="isAccountConnected"
    ref="modal"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import AccountImportModal from './AccountImportBlock/AccountImportModal.vue'

export default {
  name: 'AccountImportBlock',
  components: {
    BaseButton,
    AccountImportModal
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    addFormatted () {
      return this.$t(
        'buttons.from.account'
      )
    },
    isAccountConnected () {
      return this.lastfmNickname
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
    }
  },
  methods: {
    handleClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
