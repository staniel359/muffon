<template>
  <BaseModalContainer
    ref="modal"
    size="mini"
    is-multiple
    @visible="handleVisible"
  >
    <template
      #default="slotProps"
    >
      <div
        class="content large-padded"
        :class="[
          slotProps.class
        ]"
      >
        <BaseProfileDeleteForm
          ref="form"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseProfileDeleteForm
  from '@/components/forms/profile/BaseProfileDeleteForm.vue'

export default {
  name: 'PasswordConfirmModal',
  components: {
    BaseModalContainer,
    BaseProfileDeleteForm
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
