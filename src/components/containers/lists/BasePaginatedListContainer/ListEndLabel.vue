<template>
  <div class="list-end-label-container">
    <BaseLabel
      class="mini empty list-end-label"
      :is-basic="false"
      is-circular
    />
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'

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
  margin: 0.5em 0

.list-end-label
  @extend .background-grey
  &.inverted
    @extend .background-grey-inverted
</style>
