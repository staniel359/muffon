<template>
  <div class="list-end-label-container">
    <BaseLabel
      class="mini empty circular list-end-label"
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
.list-end-label-container
  @extend .w-100, .text-align-center
  margin-top: 1em

.list-end-label
  @extend .background-grey
  &.inverted
    @extend .background-grey-inverted
</style>
