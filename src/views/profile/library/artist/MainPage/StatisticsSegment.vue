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
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseStatistics from '@/BaseStatistics.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'
import { localize } from '#/actions/plugins/i18n'

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
          text: localize(
            'layout.navigation.albums'
          ),
          value: this.artistData.albums_count,
          link: formatProfileLibraryArtistAlbumsLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        },
        {
          text: localize(
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
