<template>
  <BaseListContainer class="selection">
    <TrackItem
      v-for="(trackData, index) in tracksFormatted"
      :key="trackData.uuid"
      :trackData="trackData"
      :queueTracks="queueTracks"
      :isWithImage="isWithImage"
      :isWithIndex="isWithIndex"
      :index="index"
      :isWithArtistName="isWithArtistName"
      :albumArtistName="albumArtistName"
      :isWithAlbumTitle="isWithAlbumTitle"
      :isWithListenersCount="isWithListenersCount"
      :topTrackCount="topTrackCount"
      :isWithDuration="isWithDuration"
      :isWithSource="isWithSource"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :isWithLibraryLink="isWithLibraryLink"
      :isWithListenedButton="isWithListenedButton"
      :isWithBookmarkButton="isWithBookmarkButton"
      :isWithFavoriteButton="isWithFavoriteButton"
      :isWithClearButton="isWithClearButton"
      :isWithCreated="isWithCreated"
      :isWithSelfButtons="isWithSelfButtons"
      :isBookmark="isBookmark"
      :isFavorite="isFavorite"
      @linkClick="handleLinkClick"
      @deleteButtonClick="handleDeleteButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import TrackItem from './BaseTracksSimpleList/TrackItem.vue'
import { collection as formatCollection } from '#/formatters'
import { track as formatTrack } from '#/formatters/track'

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
    isQueueable: {
      type: Boolean,
      default: true
    },
    isWithSelfButtons: {
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
    albumTitle: String,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isLinkToLibrary: Boolean,
    profileId: String,
    artistId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isWithFavoriteButton: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  computed: {
    tracksFormatted () {
      return formatCollection(
        this.formatTracks()
      )
    },
    queueTracks () {
      if (this.isQueueable) {
        return this.tracksFormatted
      } else {
        return []
      }
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick ({ uuid }) {
      this.$emit(
        'deleteButtonClick',
        { uuid }
      )
    },
    formatTracks () {
      return this.tracks.map(trackData => {
        return formatTrack({
          trackData,
          artistId: this.artistId,
          artistName: this.artistName,
          albumTitle: this.albumTitle,
          imageData: this.imageData
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
