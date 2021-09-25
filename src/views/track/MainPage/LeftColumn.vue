<template>
  <div class="track-page-left-column main-sticky-container">
    <div class="main-image-container">
      <BaseImage
        class="rounded bordered track-image"
        :image="image"
      />
    </div>

    <div class="left-column-extra">
      <TrackHeader
        :trackData="trackData"
        :scrollable="scrollable"
      />

      <BaseSelfButtons
        model="track"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :trackTitle="title"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="image"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import TrackHeader from './LeftColumn/TrackHeader.vue'
import BaseSelfButtons from '@/models/self/BaseSelfButtons.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseImage,
    TrackHeader,
    BaseSelfButtons
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    image () {
      return this.trackData.image.small
    },
    libraryId () {
      return this.trackData.library_id?.toString()
    },
    favoriteId () {
      return this.trackData.favorite_id?.toString()
    },
    bookmarkId () {
      return this.trackData.bookmark_id?.toString()
    },
    listenedId () {
      return this.trackData.listened_id?.toString()
    },
    title () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.trackData.album?.title
    }
  }
}
</script>

<style lang="sass" scoped>
.track-page-left-column
  width: 150px

.left-column-extra
  margin-top: 0.5em
</style>
