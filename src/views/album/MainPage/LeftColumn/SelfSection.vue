<template>
  <div class="main-self-container self-section">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseAlbumOptionsDropdown
      :album-data="albumData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-playlist-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseAlbumOptionsDropdown
  from '@/components/dropdowns/album/BaseAlbumOptionsDropdown.vue'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseAlbumOptionsDropdown
  },
  props: {
    albumData: Object,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  }
}
</script>

<style lang="sass" scoped>
.self-section
  margin-top: 1em
</style>
