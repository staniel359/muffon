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

    <template
      v-if="isWithPlaylistOption"
    >
      <BasePlaylistOption
        @click="handlePlaylistOptionClick"
      />

      <BasePlaylistsModal
        ref="playlistsModal"
        model="track"
        :model-data="trackData"
        :tracks="playlistTracks"
      />
    </template>

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

    <SaveOption
      v-if="isRenderSaveOption"
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
import BasePlaylistOption
  from '*/components/dropdowns/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import FavoriteOption from './BaseTrackOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseTrackOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseTrackOptionsDropdown/ListenedOption.vue'
import QueueOption from './BaseTrackOptionsDropdown/QueueOption.vue'
import SaveOption from './BaseTrackOptionsDropdown/SaveOption.vue'
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
    BasePlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    QueueOption,
    SaveOption,
    BaseShareOption,
    BaseDeleteOption,
    BasePlaylistsModal
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
    isWithSaveOption: Boolean,
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
          this.isWithPlaylistOption ||
          this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithListenedOption ||
          this.isWithQueueOption ||
          this.isWithSaveOption ||
          this.isWithShareOption ||
          this.isWithDeleteOption
      )
    },
    isRenderSaveOption () {
      return (
        this.isWithSaveOption &&
          !this.isSavedTrack
      )
    },
    isSavedTrack () {
      return !!this.trackData.audio?.local
    },
    shareData () {
      return formatTrackShareData(
        this.trackData
      )
    },
    playlistTracks () {
      return [
        this.trackData
      ]
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    handleDeleteOptionClick () {
      this.$emit(
        'deleteOptionClick'
      )
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
