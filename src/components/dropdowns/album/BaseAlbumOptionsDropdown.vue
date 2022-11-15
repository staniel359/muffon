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
    BaseDeleteOption
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
      this.$emit(
        'deleteOptionClick'
      )
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
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
