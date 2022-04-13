<template>
  <div class="main-self-container">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseOptionsDropdown
      model="album"
      :album-title="albumTitle"
      :artist-name="artistName"
      :album-tracks="tracks"
      :image-url="imageData?.original"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

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
