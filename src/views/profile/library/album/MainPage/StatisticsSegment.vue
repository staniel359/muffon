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
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseStatistics
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    albumId: {
      type: String,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.$t(
            'layout.navigation.tracks'
          ),
          value: this.albumData.tracks_count,
          link: formatProfileLibraryAlbumTracksLink({
            profileId: this.profileId,
            albumId: this.albumId
          })
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
