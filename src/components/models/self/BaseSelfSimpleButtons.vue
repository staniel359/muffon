<template>
  <div
    v-if="isRender"
    class="main-simple-self-buttons"
  >
    <LibraryButton
      v-if="isRenderLibraryLink"
      class="main-simple-self-button"
      :model="model"
      :modelId="libraryId"
    />

    <FavoriteButton
      v-if="isRenderFavoriteButton"
      class="main-simple-self-button"
      :model="model"
      :modelId="favoriteId"
    />

    <BookmarkButton
      v-if="isRenderBookmarkButton"
      class="main-simple-self-button"
      :model="model"
      :modelId="bookmarkId"
    />

    <ListenedButton
      v-if="isRenderListenedButton"
      class="main-simple-self-button"
      :model="model"
      :modelId="listenedId"
    />
  </div>
</template>

<script>
import LibraryButton from './BaseSelfSimpleButtons/LibraryButton.vue'
import FavoriteButton from './BaseSelfSimpleButtons/FavoriteButton.vue'
import BookmarkButton from './BaseSelfSimpleButtons/BookmarkButton.vue'
import ListenedButton from './BaseSelfSimpleButtons/ListenedButton.vue'

export default {
  name: 'BaseSelfSimpleButtons',
  components: {
    LibraryButton,
    FavoriteButton,
    BookmarkButton,
    ListenedButton
  },
  props: {
    modelData: {
      type: Object,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    isWithLibraryLink: Boolean,
    isWithFavoriteButton: Boolean,
    isWithBookmarkButton: Boolean,
    isWithListenedButton: Boolean
  },
  computed: {
    isRender () {
      return (
        this.isRenderLibraryLink ||
          this.isRenderFavoriteButton ||
          this.isRenderBookmarkButton ||
          this.isRenderListenedButton
      )
    },
    isRenderLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.modelData.library_id?.toString()
    },
    isRenderFavoriteButton () {
      return (
        this.isWithFavoriteButton &&
          !!this.favoriteId
      )
    },
    favoriteId () {
      return this.modelData.favorite_id?.toString()
    },
    isRenderBookmarkButton () {
      return (
        this.isWithBookmarkButton &&
          !!this.bookmarkId
      )
    },
    bookmarkId () {
      return this.modelData.bookmark_id?.toString()
    },
    isRenderListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.modelData.listened_id?.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
