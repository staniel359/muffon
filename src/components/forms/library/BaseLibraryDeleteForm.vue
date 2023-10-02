<template>
  <BaseLibraryDeleteFormContainer>
    <div class="main-top-small-section">
      <BaseHeader
        tag="h5"
        :text="confirmText"
      />
    </div>

    <BaseProfilePasswordField
      ref="password"
    />

    <div class="main-form-submit-button-container">
      <BaseSubmitButton
        action-key="confirm"
      />
    </div>
  </BaseLibraryDeleteFormContainer>
</template>

<script>
import BaseLibraryDeleteFormContainer
  from '@/components/containers/forms/library/BaseLibraryDeleteFormContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseProfilePasswordField
  from '@/components/fields/profile/BaseProfilePasswordField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseLibraryDeleteForm',
  components: {
    BaseLibraryDeleteFormContainer,
    BaseHeader,
    BaseProfilePasswordField,
    BaseSubmitButton
  },
  computed: {
    confirmText () {
      return this.$t(
        'forms.confirm.password'
      )
    }
  },
  methods: {
    focus () {
      this.$refs
        .password
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
