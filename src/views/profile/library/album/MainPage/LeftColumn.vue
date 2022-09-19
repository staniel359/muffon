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
      :album-data="albumData"
      :profile-id="profileId"
    />

    <SelfSegment
      v-if="currentProfileId"
      :album-data="albumData"
      :profile-id="profileId"
    />

    <SinceSegment
      :album-data="albumData"
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
    albumData: Object,
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
