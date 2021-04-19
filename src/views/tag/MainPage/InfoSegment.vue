<template>
  <BaseSegmentContainer :tagName="tagName">
    <template #default="segmentSlotProps">
      <CoverSegment :tagName="tagName"/>

      <div
        class="ui segment main-segment tag-info-segment"
        :class="{ loading: segmentSlotProps.isLoading }"
      >
        <BaseError
          v-if="segmentSlotProps.error"
          :error="segmentSlotProps.error"
          @refresh="segmentSlotProps.handleRefresh"
        />
        <InfoSection
          v-else-if="segmentSlotProps.tagData"
          :tagData="segmentSlotProps.tagData"
        />
      </div>
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/pages/tag/BaseSegmentContainer.vue'
import CoverSegment from './InfoSegment/CoverSegment.vue'
import InfoSection from './InfoSegment/InfoSection.vue'
import BaseError from '@/BaseError.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    CoverSegment,
    BaseError,
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
  @extend .h-100, .overflow-y-auto
  padding: 60px 80px 40px 80px
  &:not(.loading)
    background: $colorBlackTransparent
</style>
