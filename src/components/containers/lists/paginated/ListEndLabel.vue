<template>
  <div class="main-bottom-section width-100 text-align-center">
    <BaseLabel
      class="mini empty circular list-end-label background-grey"
      :is-change-transparency="false"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'ListEndLabel',
  components: {
    BaseLabel
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.list-end-label
  &.inverted
    @extend .background-grey-inverted
</style>
