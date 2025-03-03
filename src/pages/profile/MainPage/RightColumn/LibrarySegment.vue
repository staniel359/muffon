<template>
  <BaseHeaderSegmentsContainer
    :scope="scope"
    :header-link="headerLink"
  >
    <StatisticsSegment
      :profile-data="profileData"
    />

    <PlayButtonSegment
      v-if="isAnyTracks"
      :profile-id="profileId"
    />

    <LibraryTabsSegment
      :profile-id="profileId"
      :class="{
        bordered: isAnyTracks
      }"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import PlayButtonSegment from './LibrarySegment/PlayButtonSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'
import {
  main as formatProfileLibraryLink
} from '@/helpers/formatters/links/profile/library'

export default {
  name: 'LibrarySegment',
  components: {
    BaseHeaderSegmentsContainer,
    StatisticsSegment,
    PlayButtonSegment,
    LibraryTabsSegment
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      scope: 'library'
    }
  },
  computed: {
    profileId () {
      return this.profileData.id
    },
    headerLink () {
      return formatProfileLibraryLink(
        {
          profileId: this.profileId
        }
      )
    },
    isAnyTracks () {
      return !!this.profileData
        .library
        .tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
