<template>
  <BaseTrackContainer
    ref="track"
    class="item main-simple-list-item"
    :track-data="trackData"
    :queue-tracks="queueTracks"
    :is-disabled="isDeleted"
    is-with-active-class
  >
    <template #default="slotProps">
      <BaseTrackContent
        :track-data="trackData"
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :is-current="slotProps.isCurrent"
        :is-with-image="isWithImage"
        :is-with-index="isWithIndex"
        :index="index"
        :is-with-artist-name="isWithArtistName"
        :album-artist-name="albumArtistName"
        :is-with-album-title="isWithAlbumTitle"
        :is-with-listeners-count="isWithListenersCount"
        :top-track-count="topTrackCount"
        :is-with-duration="isWithDuration"
        :is-with-source="isWithSource"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-queue-option="isWithQueueOption"
        :is-with-playlist-option="isWithPlaylistOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-with-clear-button="isWithClearButton"
        :is-with-created="isWithCreated"
        :is-with-self-icons="isWithSelfIcons"
        :is-bookmark="isBookmark"
        :is-favorite="isFavorite"
        :is-playlist-track="isPlaylistTrack"
        :is-saved-track="isSavedTrack"
        :playlist-id="playlistId"
        :playlist-title="playlistTitle"
        :is-deleted="isDeleted"
        @link-click="handleLinkClick"
        @clear-button-click="handleClearButtonClick"
        @deleted="handleDeleted"
      />
    </template>
  </BaseTrackContainer>
</template>

<script>
import BaseTrackContainer
  from '*/components/containers/track/BaseTrackContainer.vue'
import BaseTrackContent from '*/components/models/track/BaseTrackContent.vue'

export default {
  name: 'TrackItem',
  components: {
    BaseTrackContainer,
    BaseTrackContent
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    trackData: Object,
    queueTracks: Array,
    isWithImage: Boolean,
    isWithIndex: Boolean,
    index: Number,
    albumArtistName: String,
    isWithArtistName: Boolean,
    isWithAlbumTitle: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isWithSelfIcons: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    isSavedTrack: Boolean,
    playlistId: String,
    playlistTitle: String
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    isDeleted () {
      return !!this.trackData.isDeleted
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.trackData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'clearButtonClick',
        {
          uuid
        }
      )
    },
    handleDeleted () {
      this.paginationItem
        .isDeleted = true
    },
    getAudio () {
      this.$refs
        .track
        .getAudio()
    }
  }
}
</script>

<style lang="sass" scoped></style>
