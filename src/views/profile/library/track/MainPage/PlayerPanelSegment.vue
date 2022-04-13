<template>
  <BaseSegmentContainer
    :class="[
      'raised',
      'main-segment-container',
      'track-player-panel-container'
    ]"
  >
    <BaseTrackPlayerPanel
      :track-data="trackData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTrackPlayerPanel
  from '*/components/models/track/BaseTrackPlayerPanel.vue'

export default {
  name: 'PlayerPanelSegment',
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
.track-player-panel-container
  @extend .no-padding, .overflow-hidden
</style>
