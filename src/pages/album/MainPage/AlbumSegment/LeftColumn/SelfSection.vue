<template>
  <div class="main-self-container main-bottom-medium-section">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseAlbumOptionsPopup
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
      is-with-queue-option
      is-with-share-option
      is-with-external-link-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseAlbumOptionsPopup
  from '@/components/popups/album/BaseAlbumOptionsPopup.vue'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseAlbumOptionsPopup
  },
  props: {
    albumData: Object,
    libraryId: Number,
    favoriteId: Number,
    bookmarkId: Number,
    listenedId: Number
  }
}
</script>

<style lang="sass" scoped></style>
