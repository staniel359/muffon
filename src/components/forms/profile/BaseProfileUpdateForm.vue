<template>
  <BaseProfileUpdateFormContainer
    :image="image"
  >
    <MainSection />

    <BaseDivider />

    <ExtraSection
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
  from '@/components/containers/forms/profile/BaseProfileUpdateFormContainer.vue'
import MainSection from './BaseProfileUpdateForm/MainSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ExtraSection from './BaseProfileUpdateForm/ExtraSection.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseProfileUpdateForm',
  components: {
    BaseProfileUpdateFormContainer,
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
    handleImageChange (
      value
    ) {
      this.image = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
