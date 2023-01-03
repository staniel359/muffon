<template>
  <BaseDeleteModal
    ref="deleteModal"
    model-type="account"
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
