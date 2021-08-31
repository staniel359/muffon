<template>
  <BaseListContainer class="selection">
    <BaseTrackContainer
      v-for="(trackData, index) in tracksFormatted"
      class="item main-simple-list-item"
      :key="trackData.uuid"
      :trackData="trackData"
      :queueTracks="queueTracks"
      isWithActiveClass
    >
      <template #default="slotProps">
        <BaseTrackContent
          :trackData="trackData"
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :isCurrent="slotProps.isCurrent"
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
          :isWithClearButton="isWithClearButton"
          :isWithCreated="isWithCreated"
          @linkClick="handleLinkClick"
          @deleteButtonClick="handleDeleteButtonClick"
        />
      </template>
    </BaseTrackContainer>
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import BaseTrackContainer from '@/containers/track/BaseTrackContainer.vue'
import BaseTrackContent from '@/models/track/BaseTrackContent.vue'
import { collection as formatCollection } from '#/formatters'
import { track as formatTrack } from '#/formatters/track'

export default {
  name: 'BaseTracksSimpleList',
  components: {
    BaseListContainer,
    BaseTrackContainer,
    BaseTrackContent
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
    isWithClearButton: Boolean,
    isWithCreated: Boolean
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
        return null
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
