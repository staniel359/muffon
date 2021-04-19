<template>
  <BaseTracksSimpleList
    :tracks="tracks"
    :albumArtistName="artistName"
    :albumTitle="albumTitle"
    :imageData="imageData"
    :isWithSource="isWithSource"
    isWithIndex
    isWithArtistName
    isWithLength
  />
</template>

<script>
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { getSourceData as getAudioSourceData } from '#/actions/audio'

export default {
  name: 'TracksList',
  components: {
    BaseTracksSimpleList
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
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
      return !!getAudioSourceData(
        this.sourceId
      ).isStreamable
    },
    sourceId () {
      return this.albumData.source
    }
  }
}
</script>

<style lang="sass" scoped></style>
