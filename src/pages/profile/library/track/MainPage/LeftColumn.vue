<template>
  <BaseSegmentsContainer
    class="main-profile-page-left-column main-sticky-container"
  >
    <InfoSegment
      :track-data="trackData"
      :profile-id="profileId"
    />

    <SelfSegment
      :track-data="trackData"
      :profile-id="profileId"
    />

    <BaseCreatedSegment
      class="main-profile-page-info"
      model="library"
      :model-data="trackData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
    InfoSegment,
    SelfSegment,
    BaseCreatedSegment
  },
  props: {
    trackData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
