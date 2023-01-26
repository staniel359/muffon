<template>
  <BaseModalContainer
    ref="modal"
    size="mini"
    is-multiple
    @visible="handleVisible"
  >
    <div class="content">
      <BaseLibraryDeleteForm
        ref="form"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseLibraryDeleteForm
  from '@/components/forms/library/BaseLibraryDeleteForm.vue'

export default {
  name: 'PasswordConfirmModal',
  components: {
    BaseModalContainer,
    BaseLibraryDeleteForm
  },
  methods: {
    handleVisible () {
      this.focus()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    focus () {
      this.$refs
        .form
        .focus()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
