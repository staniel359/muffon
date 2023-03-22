<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-transparent="isTransparent"
  >
    <PageOption
      v-if="isWithPageOption"
      :album-data="albumData"
      @click="handleLinkClick"
    />

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
        :model-data="albumData"
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
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import PageOption from './BaseAlbumOptionsPopup/PageOption.vue'
import LibraryOption from './BaseAlbumOptionsPopup/LibraryOption.vue'
import BasePlaylistOption
  from '@/components/popups/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import FavoriteOption from './BaseAlbumOptionsPopup/FavoriteOption.vue'
import BookmarkOption from './BaseAlbumOptionsPopup/BookmarkOption.vue'
import ListenedOption from './BaseAlbumOptionsPopup/ListenedOption.vue'
import QueueOption from './BaseAlbumOptionsPopup/QueueOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
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
  name: 'BaseAlbumOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    PageOption,
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
    isTransparent: {
      type: Boolean,
      default: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isLinkToLibrary: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isWithPageOption: Boolean,
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
        this.isWithPageOption ||
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
