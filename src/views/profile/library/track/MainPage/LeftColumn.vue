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

    <BaseSinceSegment
      class="main-profile-page-info"
      model="library"
      :model-data="trackData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import BaseSinceSegment from '@/components/segments/BaseSinceSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    SelfSegment,
    BaseSinceSegment
  },
  props: {
    trackData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
