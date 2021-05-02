<template>
  <BaseTagSegmentContainer :tagName="tagName">
    <template #default="slotProps">
      <CoverSegment :tagName="tagName"/>

      <BaseSegmentContainer
        class="tag-info-segment"
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <InfoSection
          v-if="slotProps.tagData"
          :tagData="slotProps.tagData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseTagSegmentContainer>
</template>

<script>
import BaseTagSegmentContainer
  from '@/containers/pages/tag/BaseTagSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import CoverSegment from './InfoSegment/CoverSegment.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseTagSegmentContainer,
    BaseSegmentContainer,
    CoverSegment,
    InfoSection
  },
  props: {
    tagName: String
  }
}
</script>

<style lang="sass" scoped>
.main-segment-container
  @extend .relative, .overflow-hidden
  height: 420px

.tag-info-segment
  @extend .h-100, .overflow-y-auto, .no-border
  padding: 60px 80px 40px 80px
  &:not(.loading)
    @extend .background-black-transparent
</style>
