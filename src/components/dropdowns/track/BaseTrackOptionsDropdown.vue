<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <PageOption
      v-if="isWithPageOption"
      :track-data="trackData"
      @click="handleLinkClick"
    />

    <SourceOption
      v-if="isWithSourceOption"
      @click="handleSourceClick"
    />

    <LibraryOption
      v-if="isRenderLibraryOption"
      :library-id="libraryId"
      :track-data="trackData"
      @link-click="handleLinkClick"
    />

    <template
      v-if="isRenderPlaylistOption"
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
      v-if="isRenderFavoriteOption"
      :favorite-id="favoriteId"
      :track-data="trackData"
    />

    <BookmarkOption
      v-if="isRenderBookmarkOption"
      :bookmark-id="bookmarkId"
      :track-data="trackData"
    />

    <ListenedOption
      v-if="isRenderListenedOption"
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
      v-if="isRenderShareOption"
      :share-data="shareData"
    />

    <template
      v-if="isWithDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BaseLibraryDeleteModal
        v-if="isLinkToLibrary"
        ref="deleteModal"
        model="track"
        :profile-id="profileId"
        :model-data="trackData"
        :is-with-redirect="isDeleteWithRedirect"
        @success="handleDeleted"
      />
      <BaseBookmarkDeleteModal
        v-else-if="isBookmark"
        ref="deleteModal"
        model="track"
        :model-data="trackData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="track"
        :model-data="trackData"
        @success="handleDeleted"
      />
      <BasePlaylistTrackDeleteModal
        v-else-if="isPlaylistTrack"
        ref="deleteModal"
        :playlist-track-data="trackData"
        :playlist-id="playlistId"
        :playlist-title="playlistTitle"
        @success="handleDeleted"
      />
      <BaseSavedTrackDeleteModal
        v-else-if="isSavedTrack"
        ref="deleteModal"
        :track-data="trackData"
        @success="handleDeleted"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import PageOption from './BaseTrackOptionsDropdown/PageOption.vue'
import SourceOption from './BaseTrackOptionsDropdown/SourceOption.vue'
import LibraryOption from './BaseTrackOptionsDropdown/LibraryOption.vue'
import BasePlaylistOption
  from '@/components/dropdowns/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import FavoriteOption from './BaseTrackOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseTrackOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseTrackOptionsDropdown/ListenedOption.vue'
import QueueOption from './BaseTrackOptionsDropdown/QueueOption.vue'
import SaveOption from './BaseTrackOptionsDropdown/SaveOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '@/components/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseSavedTrackDeleteModal
  from '@/components/modals/saved_tracks/BaseSavedTrackDeleteModal.vue'
import {
  track as formatTrackShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseTrackOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    PageOption,
    SourceOption,
    LibraryOption,
    BasePlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    QueueOption,
    SaveOption,
    BaseShareOption,
    BaseDeleteOption,
    BasePlaylistsModal,
    BaseLibraryDeleteModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BasePlaylistTrackDeleteModal,
    BaseSavedTrackDeleteModal
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
    isLinkToLibrary: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    playlistId: String,
    playlistTitle: String,
    isWithPageOption: Boolean,
    isWithSourceOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithSaveOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean,
    isClearable: Boolean
  },
  emits: [
    'linkClick',
    'sourceClick',
    'deleteOptionClick',
    'deleted'
  ],
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.isWithPageOption ||
          this.isWithSourceOption ||
          this.isRenderLibraryOption ||
          this.isRenderPlaylistOption ||
          this.isRenderFavoriteOption ||
          this.isRenderBookmarkOption ||
          this.isRenderListenedOption ||
          this.isWithQueueOption ||
          this.isRenderSaveOption ||
          this.isRenderShareOption ||
          this.isWithDeleteOption
      )
    },
    isRenderLibraryOption () {
      return (
        this.profileId &&
          this.isWithLibraryOption
      )
    },
    isRenderPlaylistOption () {
      return (
        this.profileId &&
          this.isWithPlaylistOption
      )
    },
    isRenderFavoriteOption () {
      return (
        this.profileId &&
          this.isWithFavoriteOption
      )
    },
    isRenderBookmarkOption () {
      return (
        this.profileId &&
          this.isWithBookmarkOption
      )
    },
    isRenderListenedOption () {
      return (
        this.profileId &&
          this.isWithListenedOption
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
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
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
      if (this.isClearable) {
        this.$emit(
          'deleteOptionClick'
        )
      } else {
        this.showDeleteModal()
      }
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    handleSourceClick (
      value
    ) {
      this.$emit(
        'sourceClick',
        value
      )
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
