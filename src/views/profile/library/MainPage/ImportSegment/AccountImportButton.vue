<template>
  <BaseButton
    class="basic circular import-button"
    icon="user circle"
    :class="{
      disabled: !isAccountConnected
    }"
    :text="accountText"
    @click="handleClick"
  />

  <BaseLibraryAccountImportModal
    v-if="isAccountConnected"
    ref="modal"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseLibraryAccountImportModal
  from '@/components/modals/library/import/BaseLibraryAccountImportModal.vue'

export default {
  name: 'AccountImportButton',
  components: {
    BaseButton,
    BaseLibraryAccountImportModal
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
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
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
