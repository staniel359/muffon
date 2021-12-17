<template>
  <BaseStatistics
    class="three small"
    :statistics="statistics"
  />
</template>

<script>
import BaseStatistics from '@/BaseStatistics.vue'
import {
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink
} from '#/formatters/links/profile/library'

export default {
  name: 'BaseProfileLibraryStatistics',
  components: {
    BaseStatistics
  },
  props: {
    libraryData: {
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
          text: this.$t(
            'navigation.artists'
          ),
          value: this.libraryData.artists_count,
          link: formatProfileLibraryArtistsLink({
            profileId: this.profileId
          })
        },
        {
          text: this.$t(
            'navigation.albums'
          ),
          value: this.libraryData.albums_count,
          link: formatProfileLibraryAlbumsLink({
            profileId: this.profileId
          })
        },
        {
          text: this.$t(
            'navigation.tracks'
          ),
          value: this.libraryData.tracks_count,
          link: formatProfileLibraryTracksLink({
            profileId: this.profileId
          })
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
