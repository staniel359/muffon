<template>
  <BaseProfileDeleteFormContainer>
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
  </BaseProfileDeleteFormContainer>
</template>

<script>
import BaseProfileDeleteFormContainer
  from '@/components/containers/forms/profile/BaseProfileDeleteFormContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseProfilePasswordField
  from '@/components/fields/profile/BaseProfilePasswordField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseProfileDeleteForm',
  components: {
    BaseProfileDeleteFormContainer,
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
