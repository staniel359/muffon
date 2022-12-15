<template>
  <BaseModalContainer
    ref="modal"
  >
    <div class="scrolling content">
      <div
        v-html="termsAndConditionsText"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import termsAndConditionsText
  from '@/helpers/data/text/legal/termsAndConditions.txt'

export default {
  name: 'TermsAndConditionsModal',
  components: {
    BaseModalContainer
  },
  computed: {
    termsAndConditionsText () {
      return termsAndConditionsText
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
