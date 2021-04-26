<template>
  <BaseArtistSegmentContainer :artistName="artistName">
    <template #default="slotProps">
      <BaseSegmentContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <InfoSection
          v-if="slotProps.artistData"
          :artistData="slotProps.artistData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseArtistSegmentContainer>
</template>

<script>
import BaseArtistSegmentContainer
  from '@/containers/pages/artist/BaseArtistSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseArtistSegmentContainer,
    BaseSegmentContainer,
    InfoSection
  },
  props: {
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
