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
      :artist-data="artistData"
      :profile-id="profileId"
    />

    <SelfSegment
      v-if="currentProfileId"
      :artist-data="artistData"
      :profile-id="profileId"
    />

    <SinceSegment
      :artist-data="artistData"
    />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
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
    artistData: Object,
    profileId: String
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
