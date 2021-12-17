<template>
  <BaseButton
    class="primary import-button"
    icon="user circle"
    :class="{ disabled: !isAccountConnected }"
    :text="accountText"
    @click="handleClick"
  />

  <BaseProfileLibraryAccountImportModal
    v-if="isAccountConnected"
    ref="modal"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/buttons/BaseButton.vue'
import BaseProfileLibraryAccountImportModal
  from '@/modals/profile/library/BaseProfileLibraryAccountImportModal.vue'

export default {
  name: 'AccountImportBlock',
  components: {
    BaseButton,
    BaseProfileLibraryAccountImportModal
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    accountText () {
      return this.$t(
        'actions.from.account'
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
