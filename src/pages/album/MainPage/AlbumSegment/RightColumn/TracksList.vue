<template>
  <div
    v-if="tracks?.length"
  >
    <BaseTracksSimpleList
      :tracks="tracks"
      :album-artist-name="artistName"
      :album-data="albumData"
      :image-data="imageData"
      :is-with-source="isWithSource"
      is-with-index
      is-with-artist-name
      is-with-duration
      is-with-source-option
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-playlist-option
      is-with-queue-option
      is-with-save-option
      is-with-share-option
      is-with-external-link-option
    />
  </div>
  <BaseNoCollectionMessage
    v-else
    scope="tracks"
  />
</template>

<script>
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseNoCollectionMessage
  from '@/components/messages/BaseNoCollectionMessage.vue'
import sources from '@/helpers/data/sources'

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
    imageData () {
      return this.albumData.image
    },
    isWithSource () {
      return !!this.sourceData?.isAudio
    },
    sourceData () {
      return sources.find(
        this.isMatchedSource
      )
    },
    source () {
      return this.albumData.source.name
    }
  },
  methods: {
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
          this.source
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
