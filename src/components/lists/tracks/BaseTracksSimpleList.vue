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
          :isWithLength="isWithLength"
          :isWithSource="isWithSource"
          @linkClick="handleLinkClick"
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
    isWithImage: Boolean,
    imageData: Object,
    isWithIndex: Boolean,
    isWithArtistName: Boolean,
    artistName: String,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    albumTitle: String,
    isWithLength: Boolean,
    isWithSource: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isQueueable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'linkClick'
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
    formatTracks () {
      return this.tracks.map(trackData => {
        return formatTrack({
          trackData,
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
