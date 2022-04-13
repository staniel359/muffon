<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <CoverSegment
      :tag-name="tagName"
    />

    <BaseSegmentContainer
      class="tag-info-segment"
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
  </div>
</template>

<script>
import CoverSegment from './InfoSegment/CoverSegment.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import HeaderSection from './InfoSegment/HeaderSection.vue'
import CountersSection from './InfoSegment/CountersSection.vue'
import SimilarSection from './InfoSegment/SimilarSection.vue'
import DescriptionSection from './InfoSegment/DescriptionSection.vue'

export default {
  name: 'InfoSegment',
  components: {
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
.main-segment-container
  @extend .relative, .overflow-hidden
  height: 420px

.tag-info-segment
  @extend .h-100, .overflow-y-auto
  padding: 50px 80px 30px 80px
  &:not(.loading)
    @extend .background-black-transparent
</style>
