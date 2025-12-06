<template>
  <BaseProfileUpdateFormContainer
    :image="image"
    @success="handleSuccess"
  >
    <MainSection />

    <BaseDivider />

    <ExtraSection
      @image-change="handleImageChange"
      @submit="handleSubmit"
    />

    <div class="main-form-submit-button-container">
      <BaseSubmitButton
        ref="submit"
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
    },
    handleSubmit () {
      this.clickSubmit()
    },
    handleSuccess () {
      this.image = {}
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
