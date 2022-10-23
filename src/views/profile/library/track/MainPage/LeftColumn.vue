<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-profile-page-left-column',
      'main-sticky-container'
    ]"
  >
    <InfoSegment
      :track-data="trackData"
      :profile-id="profileId"
    />

    <SelfSegment
      :track-data="trackData"
      :profile-id="profileId"
    />

    <BaseLibraryCreatedSegment
      :model-data="trackData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import BaseLibraryCreatedSegment
  from '@/components/segments/library/BaseLibraryCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    SelfSegment,
    BaseLibraryCreatedSegment
  },
  props: {
    trackData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
