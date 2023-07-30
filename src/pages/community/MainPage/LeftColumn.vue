<template>
  <div
    :class="[
      'ui raised segments main-segments',
      'main-segment-container',
      'main-sticky-container',
      'left-column'
    ]"
  >
    <InfoSegment
      :community-data="communityData"
      :scrollable="scrollable"
    />

    <JoinedSegment
      :community-data="communityData"
    />

    <MembersSegment
      :community-data="communityData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import JoinedSegment from './LeftColumn/JoinedSegment.vue'
import MembersSegment from './LeftColumn/MembersSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    JoinedSegment,
    MembersSegment
  },
  props: {
    communityData: Object,
    scrollable: HTMLDivElement
  }
}
</script>

<style lang="sass" scoped>
.left-column
  @extend .no-margin
  width: 180px
</style>
