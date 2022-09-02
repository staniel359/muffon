<template>
  <BaseSegmentContainer>
    <BaseProfileCreateFormContainer
      :image="image"
    >
      <MainSection />

      <ExtraSection
        @image-change="handleImageChange"
      />

      <LegalSection />

      <div class="remember-submit-button-container">
        <BaseProfileRememberField />

        <BaseProfileSubmitButton
          action-key="signup"
        />
      </div>
    </BaseProfileCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileCreateFormContainer
  from '*/components/containers/forms/profile/BaseProfileCreateFormContainer.vue'
import MainSection from './FormSegment/MainSection.vue'
import ExtraSection from './FormSegment/ExtraSection.vue'
import LegalSection from './FormSegment/LegalSection.vue'
import BaseProfileRememberField
  from '*/components/fields/profile/BaseProfileRememberField.vue'
import BaseProfileSubmitButton
  from '*/components/forms/profile/BaseProfileSubmitButton.vue'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileCreateFormContainer,
    MainSection,
    ExtraSection,
    LegalSection,
    BaseProfileRememberField,
    BaseProfileSubmitButton
  },
  data () {
    return {
      image: {}
    }
  },
  methods: {
    handleImageChange (
      value
    ) {
      this.image = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
