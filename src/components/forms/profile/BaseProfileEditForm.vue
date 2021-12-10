<template>
  <BaseProfileEditFormContainer
    :image="image"
  >
    <SuccessMessage />

    <MainSection />

    <BaseDivider />

    <ExtraSection
      @imageChange="handleImageChange"
    />

    <SubmitButton />
  </BaseProfileEditFormContainer>
</template>

<script>
import BaseProfileEditFormContainer
  from '@/containers/forms/profile/BaseProfileEditFormContainer.vue'
import SuccessMessage from './BaseProfileEditForm/SuccessMessage.vue'
import MainSection from './BaseProfileEditForm/MainSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ExtraSection from './BaseProfileEditForm/ExtraSection.vue'
import SubmitButton from './BaseProfileEditForm/SubmitButton.vue'

export default {
  name: 'BaseProfileEditForm',
  components: {
    BaseProfileEditFormContainer,
    SuccessMessage,
    MainSection,
    BaseDivider,
    ExtraSection,
    SubmitButton
  },
  data () {
    return {
      image: {}
    }
  },
  methods: {
    handleImageChange (value) {
      this.image = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
