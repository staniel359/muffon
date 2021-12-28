<template>
  <BaseListContainer class="selection">
    <TrackItem
      v-for="(trackData, index) in tracksCollection"
      :key="trackData.uuid"
      :trackData="trackData"
      :queueTracks="tracksCollection"
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
      :isWithLibraryOption="isWithLibraryOption"
      :isWithFavoriteOption="isWithFavoriteOption"
      :isWithBookmarkOption="isWithBookmarkOption"
      :isWithListenedOption="isWithListenedOption"
      :isWithPlaylistOption="isWithPlaylistOption"
      :isWithDeleteOption="isWithDeleteOption"
      :isClearable="isClearable"
      :isWithCreated="isWithCreated"
      :isWithSelfIcons="isWithSelfIcons"
      :isBookmark="isBookmark"
      :isFavorite="isFavorite"
      :isPlaylistTrack="isPlaylistTrack"
      :playlistId="playlistId"
      :playlistTitle="playlistTitle"
      @linkClick="handleLinkClick"
      @deleteButtonClick="handleDeleteButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
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
    albumTitle: String,
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
    isWithPlaylistOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    playlistId: String,
    playlistTitle: String
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
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
        const isFromSource =
          trackData.audio?.present

        return formatTrack({
          trackData,
          artistName: this.artistName,
          albumTitle: this.albumTitle,
          imageData: this.imageData,
          isFromSource
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
