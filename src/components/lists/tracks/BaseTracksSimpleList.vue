<template>
  <BaseListContainer class="selection">
    <TrackItem
      v-for="(trackData, index) in tracksCollection"
      :key="trackData.uuid"
      :track-data="trackData"
      :queue-tracks="tracksCollection"
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
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import TrackItem from './BaseTracksSimpleList/TrackItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  track as formatPlayerTrack
} from '*/helpers/formatters/player/track'

export default {
  name: 'BaseTracksSimpleList',
  components: {
    BaseListContainer,
    TrackItem
  },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithImage: Boolean,
    imageData: Object,
    isWithIndex: Boolean,
    isWithArtistName: Boolean,
    artistName: String,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    albumData: Object,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
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
    tracksCollection () {
      return formatCollection(
        this.formatTracks()
      )
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
    formatTracks () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    formatTrack (
      trackData
    ) {
      const isFromSource =
        trackData.audio?.present

      return formatPlayerTrack(
        {
          trackData,
          artistName: this.artistName,
          albumData: this.albumData && {
            source: this.albumData.source,
            title: this.albumData.title
          },
          imageData: this.imageData,
          isFromSource
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
