<template>
  <BaseProfileCreateFormContainer
    :image="image"
  >
    <MainSection />

    <BaseAccordionContainer
      :title="extraText"
    >
      <ExtraSection
        @imageChange="handleImageChange"
      />
    </BaseAccordionContainer>

    <BaseProfileRememberField />

    <div class="submit-button-container">
      <BaseProfileSubmitButton
        actionKey="signup"
      />
    </div>

    <BaseDivider />

    <LoginSection
      @loginLinkClick="handleLoginLinkClick"
    />
  </BaseProfileCreateFormContainer>
</template>

<script>
import BaseProfileCreateFormContainer
  from '@/containers/forms/profile/BaseProfileCreateFormContainer.vue'
import MainSection from './BaseProfileSignupForm/MainSection.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ExtraSection from './BaseProfileSignupForm/ExtraSection.vue'
import BaseProfileRememberField
  from '@/fields/profile/BaseProfileRememberField.vue'
import BaseProfileSubmitButton
  from '@/forms/profile/BaseProfileSubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import LoginSection from './BaseProfileSignupForm/LoginSection.vue'

export default {
  name: 'BaseProfileSignupForm',
  components: {
    BaseProfileCreateFormContainer,
    MainSection,
    BaseAccordionContainer,
    ExtraSection,
    BaseProfileRememberField,
    BaseProfileSubmitButton,
    BaseDivider,
    LoginSection
  },
  emits: [
    'loginLinkClick'
  ],
  data () {
    return {
      image: {}
    }
  },
  computed: {
    extraText () {
      return this.$t(
        'shared.profile.form.sections.extra'
      )
    }
  },
  methods: {
    handleLoginLinkClick () {
      this.$emit(
        'loginLinkClick'
      )
    },
    handleImageChange (value) {
      this.image = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
