<template>
  <BaseSegmentsContainer
    class="relative overflow-hidden"
  >
    <CoverSegment
      :tag-name="tagName"
    />

    <BaseSegmentContainer
      class="tag-info-segment height-100 overflow-y-auto"
      :is-change-transparency="false"
    >
      <HeaderSection
        :tag-name="tagName"
      />

      <CountersSection
        :tag-data="tagData"
      />

      <SimilarSection
        :tag-name="tagName"
      />

      <DescriptionSection
        :tag-data="tagData"
      />
    </BaseSegmentContainer>
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import CoverSegment from './InfoSegment/CoverSegment.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import HeaderSection from './InfoSegment/HeaderSection.vue'
import CountersSection from './InfoSegment/CountersSection.vue'
import SimilarSection from './InfoSegment/SimilarSection.vue'
import DescriptionSection from './InfoSegment/DescriptionSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentsContainer,
    CoverSegment,
    BaseSegmentContainer,
    HeaderSection,
    CountersSection,
    SimilarSection,
    DescriptionSection
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
@import '@/assets/styles/Shared.sass'

.main-segment-container
  height: 450px

.tag-info-segment
  padding: 60px 80px 30px 80px !important
  &:not(.loading)
    @extend .background-black-transparent
</style>
