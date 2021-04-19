<template>
  <BaseSegmentContainer :artistName="artistName">
    <template #default="segmentSlotProps">
      <div
        class="ui segment main-segment"
        :class="{ loading: segmentSlotProps.isLoading }"
      >
        <BaseError
          v-if="segmentSlotProps.error"
          :error="segmentSlotProps.error"
          @refresh="segmentSlotProps.handleRefresh"
        />
        <InfoSection
          v-else-if="segmentSlotProps.artistData"
          :artistData="segmentSlotProps.artistData"
        />
      </div>
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/pages/artist/BaseSegmentContainer.vue'
import BaseError from '@/BaseError.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseError,
    InfoSection
  },
  props: {
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
