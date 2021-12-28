<template>
  <div class="main-self-container">
    <BaseSelfIcons
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
    />

    <BaseOptionsDropdown
      model="album"
      :albumTitle="albumTitle"
      :artistName="artistName"
      :albumTracks="tracks"
      :imageUrl="imageData?.original"
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
      isWithLibraryOption
      isWithFavoriteOption
      isWithBookmarkOption
      isWithListenedOption
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseOptionsDropdown
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  },
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.albumData.artists
    },
    tracks () {
      return this.albumData.tracks
    },
    imageData () {
      return this.albumData.image
    }
  }
}
</script>

<style lang="sass" scoped></style>
