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

    <SinceSegment
      :track-data="trackData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import SinceSegment from './LeftColumn/SinceSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    SelfSegment,
    SinceSegment
  },
  props: {
    trackData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
