<template>
  <BaseProfileCreateContainer
    :image="image"
  >
    <MainSection />

    <BaseAccordionContainer
      :title="extraTextFormatted"
    >
      <ExtraSection
        @imageChange="handleImageChange"
      />
    </BaseAccordionContainer>

    <BaseProfileRememberField />

    <SubmitButton />

    <BaseDivider />

    <LoginSection
      @loginLinkClick="handleLoginLinkClick"
    />
  </BaseProfileCreateContainer>
</template>

<script>
import BaseProfileCreateContainer
  from '@/containers/profile/BaseProfileCreateContainer.vue'
import MainSection from './BaseSignupForm/MainSection.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ExtraSection from './BaseSignupForm/ExtraSection.vue'
import BaseProfileRememberField
  from '@/models/profile/fields/BaseProfileRememberField.vue'
import SubmitButton from './BaseSignupForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import LoginSection from './BaseSignupForm/LoginSection.vue'

export default {
  name: 'BaseSignupForm',
  components: {
    BaseProfileCreateContainer,
    MainSection,
    BaseAccordionContainer,
    ExtraSection,
    BaseProfileRememberField,
    SubmitButton,
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
    extraTextFormatted () {
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
