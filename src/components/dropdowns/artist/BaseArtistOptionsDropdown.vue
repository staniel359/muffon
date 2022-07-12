<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <LibraryOption
      v-if="isWithLibraryOption"
      :library-id="libraryId"
      :artist-name="artistName"
      @link-click="handleLinkClick"
    />

    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :artist-name="artistName"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :artist-name="artistName"
    />

    <ListenedOption
      v-if="isWithListenedOption"
      :listened-id="listenedId"
      :artist-name="artistName"
    />

    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />

    <BaseDeleteOption
      v-if="isWithDeleteOption"
      @click="handleDeleteOptionClick"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import BaseOptionsDropdownContainer
  from '*/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import LibraryOption from './BaseArtistOptionsDropdown/LibraryOption.vue'
import FavoriteOption from './BaseArtistOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseArtistOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseArtistOptionsDropdown/ListenedOption.vue'
import BaseShareOption
  from '*/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '*/components/dropdowns/options/BaseDeleteOption.vue'

export default {
  name: 'BaseArtistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    LibraryOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    BaseShareOption,
    BaseDeleteOption
  },
  props: {
    artistName: String,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    shareData: Object,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
  ],
  computed: {
    isRender () {
      return (
        this.isWithLibraryOption ||
          this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithListenedOption ||
          this.isWithShareOption ||
          this.isWithDeleteOption
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick () {
      this.$emit(
        'deleteOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
