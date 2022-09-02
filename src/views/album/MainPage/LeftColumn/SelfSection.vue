<template>
  <BaseDivider />

  <div class="main-self-container">
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
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseAlbumOptionsDropdown
  from '*/components/dropdowns/album/BaseAlbumOptionsDropdown.vue'

export default {
  name: 'SelfSection',
  components: {
    BaseDivider,
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

<style lang="sass" scoped></style>
