<template>
  <BaseSegmentContainer
    class="raised main-segment-container player-segment"
  >
    <BaseTrackPlayerPanel
      :track-data="trackData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTrackPlayerPanel
  from '@/components/models/track/BaseTrackPlayerPanel.vue'

export default {
  name: 'PlayerSegment',
  components: {
    BaseSegmentContainer,
    BaseTrackPlayerPanel
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
.player-segment
  @extend .no-padding
</style>
