<template>
  <div class="ui raised segments main-segment-container">
    <BaseHeaderSegment
      scope="library"
      :link="headerLink"
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
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import CompatibilitySegment from './LibrarySegment/CompatibilitySegment.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'
import { isCurrentProfile } from '*/helpers/utils'
import {
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'LibrarySegment',
  components: {
    BaseHeaderSegment,
    CompatibilitySegment,
    StatisticsSegment,
    LibraryTabsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    profileNickname: String
  },
  computed: {
    isRenderCompatibility () {
      return !isCurrentProfile(
        this.profileId
      )
    },
    headerLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
