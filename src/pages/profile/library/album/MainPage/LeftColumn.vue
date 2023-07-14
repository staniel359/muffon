<template>
  <div
    :class="[
      'ui raised segments main-segments',
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

    <BaseCreatedSegment
      class="main-profile-page-info"
      model="library"
      :model-data="albumData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    SelfSegment,
    BaseCreatedSegment
  },
  props: {
    albumData: Object,
    profileId: String
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
