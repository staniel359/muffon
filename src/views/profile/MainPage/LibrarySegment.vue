<template>
  <div class="ui raised segments main-segment-container">
    <HeaderSegment
      :profileId="profileId"
    />

    <CompatibilitySegment
      v-if="isRenderCompatibility"
      :profileId="profileId"
      :profileNickname="profileNickname"
    />

    <StatisticsSegment
      :profileId="profileId"
    />

    <LibraryTabsSegment
      :profileId="profileId"
    />
  </div>
</template>

<script>
import HeaderSegment from './LibrarySegment/HeaderSegment.vue'
import CompatibilitySegment from './LibrarySegment/CompatibilitySegment.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'LibrarySegment',
  components: {
    HeaderSegment,
    CompatibilitySegment,
    StatisticsSegment,
    LibraryTabsSegment
  },
  props: {
    profileId: String,
    profileNickname: String
  },
  computed: {
    isRenderCompatibility () {
      return !isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
