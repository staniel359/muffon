<template>
  <BaseProfileUpdateFormContainer
    :image="image"
  >
    <SuccessMessage />

    <MainSection />

    <BaseDivider />

    <ExtraSection
      @imageChange="handleImageChange"
    />

    <div class="submit-button-container">
      <BaseSubmitButton
        actionKey="save"
      />
    </div>
  </BaseProfileUpdateFormContainer>
</template>

<script>
import BaseProfileUpdateFormContainer
  from '@/containers/forms/profile/BaseProfileUpdateFormContainer.vue'
import SuccessMessage from './BaseProfileUpdateForm/SuccessMessage.vue'
import MainSection from './BaseProfileUpdateForm/MainSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ExtraSection from './BaseProfileUpdateForm/ExtraSection.vue'
import BaseSubmitButton from '@/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseProfileUpdateForm',
  components: {
    BaseProfileUpdateFormContainer,
    SuccessMessage,
    MainSection,
    BaseDivider,
    ExtraSection,
    BaseSubmitButton
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
