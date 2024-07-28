<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <span
      v-html="privateText"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'BasePrivatePopup',
  components: {
    BaseSegmentContainer
  },
  props: {
    model: {
      type: String,
      required: true
    }
  },
  computed: {
    privateText () {
      return this.$t(
        `private.${this.model}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
