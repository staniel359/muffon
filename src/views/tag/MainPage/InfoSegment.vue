<template>
  <div class="ui segments main-segment-container">
    <CoverSegment :tagName="tagName"/>

    <BaseSegmentContainer
      class="tag-info-segment"
    >
      <InfoSection :tagData="tagData" />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import CoverSegment from './InfoSegment/CoverSegment.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    CoverSegment,
    InfoSection
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tagName () {
      return this.tagData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.main-segment-container
  @extend .relative, .overflow-hidden
  height: 420px

.tag-info-segment
  @extend .h-100, .overflow-y-auto
  padding: 60px 80px 40px 80px
  &:not(.loading)
    @extend .background-black-transparent
</style>
