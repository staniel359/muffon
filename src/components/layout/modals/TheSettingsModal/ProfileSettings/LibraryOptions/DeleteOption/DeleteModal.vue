<template>
  <BaseDeleteModal
    ref="deleteModal"
    model-type="library"
    is-multiple
    is-with-also-text
    @delete-button-click="handleDeleteButtonClick"
  />

  <PasswordConfirmModal
    ref="passwordModal"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import PasswordConfirmModal from './DeleteModal/PasswordConfirmModal.vue'

export default {
  name: 'DeleteModal',
  components: {
    BaseDeleteModal,
    PasswordConfirmModal
  },
  provide () {
    return {
      hideModals: this.hideModals
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.showPasswordModal()
    },
    show () {
      this.$refs
        .deleteModal
        .show()
    },
    showPasswordModal () {
      this.$refs
        .passwordModal
        .show()
    },
    hideModals () {
      this.hidePasswordModal()

      this.hide()
    },
    hide () {
      this.$refs
        .deleteModal
        .hide()
    },
    hidePasswordModal () {
      this.$refs
        .passwordModal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
