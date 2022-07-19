<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <LibraryOption
      v-if="isWithLibraryOption"
      :library-id="libraryId"
      :track-data="trackData"
      @link-click="handleLinkClick"
    />

    <PlaylistOption
      v-if="isWithPlaylistOption"
      @click="handlePlaylistOptionClick"
    />

    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :track-data="trackData"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :track-data="trackData"
    />

    <ListenedOption
      v-if="isWithListenedOption"
      :listened-id="listenedId"
      :track-data="trackData"
    />

    <QueueOption
      v-if="isWithQueueOption"
      :track-data="trackData"
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
import LibraryOption from './BaseTrackOptionsDropdown/LibraryOption.vue'
import PlaylistOption from './BaseTrackOptionsDropdown/PlaylistOption.vue'
import FavoriteOption from './BaseTrackOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseTrackOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseTrackOptionsDropdown/ListenedOption.vue'
import QueueOption from './BaseTrackOptionsDropdown/QueueOption.vue'
import BaseShareOption
  from '*/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '*/components/dropdowns/options/BaseDeleteOption.vue'
import {
  track as formatTrackShareData
} from '*/helpers/formatters/share'

export default {
  name: 'BaseTrackOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    LibraryOption,
    PlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    QueueOption,
    BaseShareOption,
    BaseDeleteOption
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isWithLibraryOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick',
    'playlistOptionClick',
    'deleteOptionClick'
  ],
  computed: {
    isRender () {
      return (
        this.isWithLibraryOption ||
          this.isWithPlaylistOption ||
          this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithListenedOption ||
          this.isWithQueueOption ||
          this.isWithShareOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatTrackShareData(
        this.trackData
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handlePlaylistOptionClick () {
      this.$emit(
        'playlistOptionClick'
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
