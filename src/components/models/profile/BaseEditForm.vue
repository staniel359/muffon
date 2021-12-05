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
  from '@/containers/profile/BaseProfileEditFormContainer.vue'
import SuccessMessage from './BaseEditForm/SuccessMessage.vue'
import MainSection from './BaseEditForm/MainSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ExtraSection from './BaseEditForm/ExtraSection.vue'
import SubmitButton from './BaseEditForm/SubmitButton.vue'

export default {
  name: 'BaseEditForm',
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
