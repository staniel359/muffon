<template>
  <BaseListContainer
    ref="list"
    class="selection"
  >
    <TrackItem
      v-for="(trackData, index) in tracksCollection"
      :key="trackData.uuid"
      :track-data="trackData"
      :queue-tracks="tracksCollection"
      :is-with-image="isWithImage"
      :is-with-artist-image="isWithArtistImage"
      :is-with-index="isWithIndex"
      :index="index"
      :is-with-artist-name="isWithArtistName"
      :album-artist-name="albumArtistName"
      :is-with-album-title="isWithAlbumTitle"
      :is-with-listeners-count="isWithListenersCount"
      :top-track-count="topTrackCount"
      :is-with-duration="isWithDuration"
      :is-with-source="isWithSource"
      :is-with-saved-icon="isWithSavedIcon"
      :is-link-to-library="isLinkToLibrary"
      :is-compatibility="isCompatibility"
      :profile-id="profileId"
      :is-with-page-option="isWithPageOption"
      :is-with-source-option="isWithSourceOption"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-queue-option="isWithQueueOption"
      :is-with-playlist-option="isWithPlaylistOption"
      :is-with-save-option="isWithSaveOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-with-created="isWithCreated"
      :is-with-self-icons="isWithSelfIcons"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :is-playlist-track="isPlaylistTrack"
      :playlist-id="playlistId"
      :playlist-title="playlistTitle"
      :is-clearable="isClearable"
      :is-queue="isQueue"
      :scrollable="scrollable"
      :is-recommendation="isRecommendation"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
      @delete-option-click="handleDeleteOptionClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import TrackItem from './BaseTracksSimpleList/TrackItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'

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
    isWithArtistImage: Boolean,
    imageData: Object,
    isWithIndex: Boolean,
    isWithArtistName: Boolean,
    artistName: String,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    albumData: Object,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isWithSavedIcon: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isLinkToLibrary: Boolean,
    isCompatibility: Boolean,
    profileId: String,
    isWithPageOption: Boolean,
    isWithSourceOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithSaveOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    playlistId: String,
    playlistTitle: String,
    isClearable: Boolean,
    isQueue: Boolean,
    isRecommendation: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick',
    'deleteOptionClick'
  ],
  data () {
    return {
      scrollable: null
    }
  },
  computed: {
    tracksCollection () {
      return formatCollection(
        this.formatTracks()
      )
    }
  },
  mounted () {
    this.scrollable =
      this.$refs.list.$el
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
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteOptionClick',
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
