<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <BaseStatistics
      class="two small"
      :statistics="statistics"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseStatistics from '@/BaseStatistics.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseStatistics
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.$t(
            'layout.navigation.albums'
          ),
          value: this.artistData.albums_count,
          link: formatProfileLibraryArtistAlbumsLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        },
        {
          text: this.$t(
            'layout.navigation.tracks'
          ),
          value: this.artistData.tracks_count,
          link: formatProfileLibraryArtistTracksLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
