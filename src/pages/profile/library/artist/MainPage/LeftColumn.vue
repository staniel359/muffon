<template>
  <BaseSegmentsContainer
    class="main-profile-page-left-column main-sticky-container"
  >
    <InfoSegment
      :artist-data="artistData"
      :profile-id="profileId"
    />

    <BaseCreatedSegment
      class="main-profile-page-info"
      model="library"
      :model-data="artistData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
    InfoSegment,
    BaseCreatedSegment
  },
  props: {
    artistData: Object,
    profileId: Number
  }
}
</script>

<style lang="sass" scoped></style>
