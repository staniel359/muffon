<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <LibraryOption
      v-if="isWithLibraryOption"
      :library-id="libraryId"
      :album-data="albumData"
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
        model="album"
        :model-data="albumData"
        :tracks="playlistTracks"
      />
    </template>

    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :album-data="albumData"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :album-data="albumData"
    />

    <ListenedOption
      v-if="isWithListenedOption"
      :listened-id="listenedId"
      :album-data="albumData"
    />

    <QueueOption
      v-if="isWithQueueOption"
      :album-data="albumData"
    />

    <BaseShareOption
      v-if="isWithShareOption"
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
        model="album"
        :profile-id="profileId"
        :model-id="libraryAlbumId"
        :model-name="albumFullTitle"
        :is-with-redirect="isDeleteWithRedirect"
        @success="handleDeleted"
      />
      <BaseBookmarkDeleteModal
        v-else-if="isBookmark"
        ref="deleteModal"
        model="album"
        :model-data="albumData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="album"
        :model-data="albumData"
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
import LibraryOption from './BaseAlbumOptionsDropdown/LibraryOption.vue'
import BasePlaylistOption
  from '@/components/dropdowns/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import FavoriteOption from './BaseAlbumOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseAlbumOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseAlbumOptionsDropdown/ListenedOption.vue'
import QueueOption from './BaseAlbumOptionsDropdown/QueueOption.vue'
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
import {
  album as formatAlbumShareData
} from '@/helpers/formatters/share'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'

export default {
  name: 'BaseAlbumOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    LibraryOption,
    BasePlaylistOption,
    BasePlaylistsModal,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    QueueOption,
    BaseShareOption,
    BaseDeleteOption,
    BaseLibraryDeleteModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
  },
  props: {
    albumData: {
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
    isWithLibraryOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'linkClick',
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
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
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
      return formatAlbumShareData(
        this.albumData
      )
    },
    playlistTracks () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    tracks () {
      return this.albumData.tracks
    },
    albumTitle () {
      return this.albumData.title
    },
    source () {
      return this.albumData.source
    },
    imageData () {
      return this.albumData.image
    },
    libraryAlbumId () {
      return this.albumData.library.id.toString()
    },
    albumFullTitle () {
      return [
        this.artistName,
        this.albumTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.albumData.artist.name
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
      this.showDeleteModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
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
    },
    formatTrack (
      trackData
    ) {
      return formatPlayerTrack(
        {
          trackData,
          albumData: {
            title: this.albumTitle,
            source: this.source
          },
          imageData: this.imageData
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
