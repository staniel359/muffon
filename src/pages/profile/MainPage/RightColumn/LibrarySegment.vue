<template>
  <BaseHeaderSegmentsContainer
    :scope="scope"
    :header-link="headerLink"
  >
    <StatisticsSegment
      :profile-id="profileId"
    />

    <LibraryTabsSegment
      :profile-id="profileId"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'
import {
  main as formatProfileLibraryLink
} from '@/helpers/formatters/links/profile/library'

export default {
  name: 'LibrarySegment',
  components: {
    BaseHeaderSegmentsContainer,
    StatisticsSegment,
    LibraryTabsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      scope: 'library'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
