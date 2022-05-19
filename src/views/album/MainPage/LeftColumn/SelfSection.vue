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
      :image-url="imageData?.large"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :share-data="shareData"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import {
  album as formatAlbumShareData
} from '*/helpers/formatters/share'

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
      return this.albumData.artist.name
    },
    tracks () {
      return this.albumData.tracks
    },
    imageData () {
      return this.albumData.image
    },
    shareData () {
      return formatAlbumShareData(
        this.albumData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
