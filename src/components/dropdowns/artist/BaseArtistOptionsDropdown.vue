<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
    @active-change="handleActiveChange"
  >
    <LibraryOption
      v-if="isWithLibraryOption"
      :library-id="libraryId"
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />

    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :artist-data="artistData"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :artist-data="artistData"
    />

    <ListenedOption
      v-if="isWithListenedOption"
      :listened-id="listenedId"
      :artist-data="artistData"
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
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import LibraryOption from './BaseArtistOptionsDropdown/LibraryOption.vue'
import FavoriteOption from './BaseArtistOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseArtistOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseArtistOptionsDropdown/ListenedOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import {
  artist as formatArtistShareData
} from '@/helpers/formatters/share'

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
    artistData: {
      type: Object,
      required: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'activeChange',
    'linkClick',
    'deleteOptionClick'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithLibraryOption ||
          this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithListenedOption ||
          this.isWithShareOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatArtistShareData(
        this.artistData
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
    },
    handleActiveChange (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
