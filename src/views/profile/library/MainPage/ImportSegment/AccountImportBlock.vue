<template>
  <BaseButton
    class="primary import-button"
    icon="user circle"
    :text="addFormatted"
    @click="handleClick"
  />

  <AccountImportModal ref="modal" />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import AccountImportModal from './AccountImportBlock/AccountImportModal.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AccountImportBlock',
  components: {
    BaseButton,
    AccountImportModal
  },
  computed: {
    addFormatted () {
      return localize(
        'pages.library.add.buttons.account'
      )
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
