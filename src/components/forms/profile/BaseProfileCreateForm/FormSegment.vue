<template>
  <BaseSegmentContainer>
    <BaseProfileCreateFormContainer
      ref="form"
      :image="image"
    >
      <MainSection />

      <ExtraSection
        @image-change="handleImageChange"
        @submit="handleSubmit"
      />

      <LegalSection />

      <BaseRecaptchaField
        :id="recaptchaId"
        :value="recaptchaValue"
        @change="handleRecaptchaFieldChange"
        @refresh-button-click="handleRefreshButtonClick"
      />

      <div class="main-form-remember-submit-button-container">
        <BaseProfileRememberField />

        <BaseSubmitButton
          ref="submit"
          action-key="signup"
        />
      </div>
    </BaseProfileCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileCreateFormContainer
  from '@/components/containers/forms/profile/BaseProfileCreateFormContainer.vue'
import MainSection from './FormSegment/MainSection.vue'
import ExtraSection from './FormSegment/ExtraSection.vue'
import LegalSection from './FormSegment/LegalSection.vue'
import BaseRecaptchaField from '@/components/fields/BaseRecaptchaField.vue'
import BaseProfileRememberField
  from '@/components/fields/profile/BaseProfileRememberField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import recaptchaMixin from '@/mixins/recaptchaMixin'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileCreateFormContainer,
    MainSection,
    ExtraSection,
    LegalSection,
    BaseRecaptchaField,
    BaseProfileRememberField,
    BaseSubmitButton
  },
  mixins: [
    recaptchaMixin
  ],
  data () {
    return {
      recaptchaId:
        'profile-create-form-recaptcha-container',
      image: {}
    }
  },
  methods: {
    handleImageChange (
      value
    ) {
      this.image = value
    },
    handleSubmit () {
      this.clickSubmit()
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
