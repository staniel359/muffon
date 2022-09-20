<template>
  <BaseModalContainer
    ref="modal"
  >
    <div class="scrolling content">
      <div
        v-html="privacyPolicyText"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import privacyPolicyText from '@/helpers/data/legal/privacyPolicy.txt'

export default {
  name: 'PrivacyPolicyModal',
  components: {
    BaseModalContainer
  },
  computed: {
    privacyPolicyText () {
      return privacyPolicyText
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
