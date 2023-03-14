<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <div class="main-columns-container">
      <LeftColumn
        :channel-data="channelData"
      />

      <RightColumn
        :channel-data="channelData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import LeftColumn from './InfoSegment/LeftColumn.vue'
import RightColumn from './InfoSegment/RightColumn.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    channelData: Object
  }
}
</script>

<style lang="sass" scoped></style>
