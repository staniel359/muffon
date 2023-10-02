<template>
  <BaseSegmentsContainer>
    <BackSegment
      @back-link-click="handleBackLinkClick"
    />

    <SuccessSegment
      v-if="isSuccess"
    />
    <ResetFormSegment
      v-else-if="isReset"
    />
    <UpdateFormSegment
      v-else-if="isUpdate"
      :email="email"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import BackSegment from './BaseProfilePasswordResetForm/BackSegment.vue'
import SuccessSegment from './BaseProfilePasswordResetForm/SuccessSegment.vue'
import ResetFormSegment
  from './BaseProfilePasswordResetForm/ResetFormSegment.vue'
import UpdateFormSegment
  from './BaseProfilePasswordResetForm/UpdateFormSegment.vue'

export default {
  name: 'BaseProfilePasswordResetForm',
  components: {
    BaseSegmentsContainer,
    BackSegment,
    SuccessSegment,
    ResetFormSegment,
    UpdateFormSegment
  },
  provide () {
    return {
      setEmail: this.setEmail,
      setIsSuccess: this.setIsSuccess
    }
  },
  emits: [
    'backLinkClick'
  ],
  data () {
    return {
      email: null,
      isSuccess: false,
      activeForm: 'reset'
    }
  },
  computed: {
    isReset () {
      return (
        this.activeForm ===
          'reset'
      )
    },
    isUpdate () {
      return (
        this.activeForm ===
          'update'
      )
    }
  },
  watch: {
    email: 'handleEmailChange'
  },
  methods: {
    handleBackLinkClick () {
      this.$emit(
        'backLinkClick'
      )
    },
    handleEmailChange (
      value
    ) {
      if (value) {
        this.activeForm = 'update'
      }
    },
    setEmail (
      value
    ) {
      this.email = value
    },
    setIsSuccess (
      value
    ) {
      this.isSuccess = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
