<template>
  <BaseProfileSegmentContainer
    scope="library"
    :header-link="headerLink"
    :is-fetch-data="false"
  >
    <template #default>
      <CompatibilitySegment
        v-if="!isSelf"
        :profile-id="profileId"
        :profile-nickname="profileNickname"
      />

      <StatisticsSegment
        :profile-id="profileId"
      />

      <LibraryTabsSegment
        :profile-id="profileId"
      />
    </template>
  </BaseProfileSegmentContainer>
</template>

<script>
import BaseProfileSegmentContainer
  from '*/components/containers/segments/profile/BaseProfileSegmentContainer.vue'
import CompatibilitySegment from './LibrarySegment/CompatibilitySegment.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'
import {
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'LibrarySegment',
  components: {
    BaseProfileSegmentContainer,
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
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    headerLink () {
      return formatProfileLibraryMainLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
