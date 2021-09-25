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
    isWithLibraryLink
    isWithListenedButton
    isWithBookmarkButton
    isWithFavoriteButton
  />
</template>

<script>
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import audioSources from '#/data/audio/sources'

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
      return this.albumData.artist.name
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
        return sourceData.id === this.sourceId
      })
    },
    sourceId () {
      return this.albumData.source_id
    }
  }
}
</script>

<style lang="sass" scoped></style>
