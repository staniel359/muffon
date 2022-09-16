<template>
  <BaseSegmentContainer>
    <BaseProfileLoginFormContainer>
      <BaseProfileEmailField
        ref="email"
      />

      <BaseProfilePasswordField />

      <div class="remember-submit-button-container">
        <BaseProfileRememberField />

        <BaseSubmitButton
          action-key="login"
        />
      </div>
    </BaseProfileLoginFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLoginFormContainer
  from '*/components/containers/forms/profile/BaseProfileLoginFormContainer.vue'
import BaseProfileEmailField
  from '*/components/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '*/components/fields/profile/BaseProfilePasswordField.vue'
import BaseProfileRememberField
  from '*/components/fields/profile/BaseProfileRememberField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLoginFormContainer,
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfileRememberField,
    BaseSubmitButton
  },
  mounted () {
    this.focusEmail()
  },
  methods: {
    focusEmail () {
      this.$refs
        .email
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
