<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseStatistics
      class="one small"
      :statistics="statistics"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseStatistics from '@/BaseStatistics.vue'
import {
  artists as formatProfileLibraryTagArtistsLink
} from '#/formatters/links/profile/library/tag'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseStatistics
  },
  props: {
    tagData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.artistsText,
          value: this.tagArtistsCount,
          link: this.tagArtistsLink
        }
      ]
    },
    artistsText () {
      return this.$t(
        'navigation.artists'
      )
    },
    tagArtistsCount () {
      return this.tagData.artists_count
    },
    tagArtistsLink () {
      return formatProfileLibraryTagArtistsLink({
        profileId: this.profileId,
        tagId: this.tagId
      })
    },
    tagId () {
      return this.tagData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
