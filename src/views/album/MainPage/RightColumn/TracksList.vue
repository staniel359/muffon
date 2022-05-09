<template>
  <BaseTracksSimpleList
    v-if="tracks?.length"
    :tracks="tracks"
    :album-artist-name="artistName"
    :album-title="albumTitle"
    :image-data="imageData"
    :is-with-source="isWithSource"
    is-with-index
    is-with-artist-name
    is-with-duration
    is-with-library-option
    is-with-favorite-option
    is-with-bookmark-option
    is-with-listened-option
    is-with-playlist-option
  />
  <BaseNoCollectionMessage
    v-else
    scope="tracks"
  />
</template>

<script>
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseNoCollectionMessage
  from '*/components/messages/BaseNoCollectionMessage.vue'
import audioSources from '*/helpers/data/audio/sources'

export default {
  name: 'TracksList',
  components: {
    BaseTracksSimpleList,
    BaseNoCollectionMessage
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
      return !!this.sourceData?.isStreamable
    },
    sourceData () {
      return audioSources.find(
        this.isMatchedSource
      )
    },
    sourceId () {
      return this.albumData.source_id
    }
  },
  methods: {
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
        this.sourceId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
