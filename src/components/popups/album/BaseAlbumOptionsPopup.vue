<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-transparent="isTransparent"
  >
    <template
      #default="slotProps"
    >
      <PageOption
        v-if="isWithPageOption"
        :album-data="albumData"
        @click="handleLinkClick"
      />

      <LibraryOption
        v-if="isRenderLibraryOption"
        :library-id="libraryId"
        :album-data="albumData"
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
          model="album"
          :model-data="albumData"
          :tracks="playlistTracks"
        />
      </template>

      <FavoriteOption
        v-if="isRenderFavoriteOption"
        :favorite-id="favoriteId"
        :album-data="albumData"
      />

      <BookmarkOption
        v-if="isRenderBookmarkOption"
        :bookmark-id="bookmarkId"
        :album-data="albumData"
      />

      <ListenedOption
        v-if="isRenderListenedOption"
        :listened-id="listenedId"
        :album-data="albumData"
      />

      <QueueOption
        v-if="isWithQueueOption"
        :album-data="albumData"
      />

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="album"
        :model-data="albumData"
      />

      <template
        v-if="isRenderDeleteOption"
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
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
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
    BaseExternalLinkOption,
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
    isWithExternalLinkOption: Boolean,
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
          this.isRenderLibraryOption ||
          this.isRenderPlaylistOption ||
          this.isRenderFavoriteOption ||
          this.isRenderBookmarkOption ||
          this.isRenderListenedOption ||
          this.isWithQueueOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isRenderDeleteOption
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
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatAlbumShareData(
        this.albumData
      )
    },
    isRenderDeleteOption () {
      return (
        this.profileId &&
          this.isWithDeleteOption
      )
    },
    playlistTracks () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    tracks () {
      return (
        this.albumData.tracks || []
      )
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
