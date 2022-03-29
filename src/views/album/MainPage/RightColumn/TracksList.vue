<template>
  <BaseTracksSimpleList
    :tracks="tracks"
    :albumArtistName="artistName"
    :albumTitle="albumTitle"
    :imageData="imageData"
    :isWithSource="isWithSource"
    :profileId="profileId"
    isWithIndex
    isWithArtistName
    isWithDuration
    isWithLibraryOption
    isWithFavoriteOption
    isWithBookmarkOption
    isWithListenedOption
    isWithPlaylistOption
  />
</template>

<script>
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import audioSources from '*/helpers/data/audio/sources'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'TracksList',
  components: {
    BaseTracksSimpleList
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    tracks () {
      return this.albumData.tracks
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.albumData.artists
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    isWithSource () {
      return !!this.sourceData?.isStreamable
    },
    sourceData () {
      return audioSources.find(sourceData => {
        return (
          sourceData.id ===
            this.sourceId
        )
      })
    },
    sourceId () {
      return this.albumData.source_id
    }
  }
}
</script>

<style lang="sass" scoped></style>
