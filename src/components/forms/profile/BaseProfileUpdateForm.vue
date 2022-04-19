<template>
  <BaseProfileUpdateFormContainer
    :image="image"
  >
    <SuccessMessage />

    <MainSection />

    <BaseDivider />

    <ExtraSection
      :is-active="isActive"
      @image-change="handleImageChange"
    />

    <div class="submit-button-container">
      <BaseSubmitButton
        action-key="save"
      />
    </div>
  </BaseProfileUpdateFormContainer>
</template>

<script>
import BaseProfileUpdateFormContainer
  from '*/components/containers/forms/profile/BaseProfileUpdateFormContainer.vue'
import SuccessMessage from './BaseProfileUpdateForm/SuccessMessage.vue'
import MainSection from './BaseProfileUpdateForm/MainSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ExtraSection from './BaseProfileUpdateForm/ExtraSection.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

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
  props: {
    isActive: Boolean
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
