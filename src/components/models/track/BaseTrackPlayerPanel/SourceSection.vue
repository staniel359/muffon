<template>
  <div class="track-source">
    <BaseSourceIcon
      class="track-source-icon"
      :source-id="sourceId"
    />
  </div>
</template>

<script>
import BaseSourceIcon from '*/components/BaseSourceIcon.vue'

export default {
  name: 'SourceSection',
  components: {
    BaseSourceIcon
  },
  props: {
    sourceId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.track-source
  @extend .d-flex, .align-items-center
  padding: 0 1em

.track-source-icon
  @extend .no-margin
</style>
