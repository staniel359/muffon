<template>
  <BaseTrackAudioIcon
    class="track-play-button"
    :isLoading="isLoading"
    :isError="isError"
    :isCurrent="isCurrent"
  />

  <TrackImage
    v-if="isRenderImage"
    :imageData="imageData"
  />

  <div class="content">
    <div class="track-index-main-info">
      <TrackIndex
        v-if="isRenderIndex"
        :index="index"
      />

      <TrackMainInfo
        :trackTitle="trackTitle"
        :isWithArtistName="isWithArtistName"
        :artistName="artistName"
        :albumArtistName="albumArtistName"
        :isWithAlbumTitle="isWithAlbumTitle"
        :albumTitle="albumTitle"
        @linkClick="handleLinkClick"
      />
    </div>

    <TrackListenersCount
      v-if="isRenderListenersCount"
      :listenersCount="listenersCount"
      :topTrackCount="topTrackCount"
    />
  </div>

  <TrackLength
    v-if="isRenderLength"
    :length="length"
  />

  <BaseSourceIcon
    v-if="isWithSource"
    class="track-source-icon"
    :sourceId="sourceId"
  />
</template>

<script>
import BaseTrackAudioIcon from '@/models/track/BaseTrackAudioIcon.vue'
import TrackImage from './BaseTrackContent/TrackImage.vue'
import TrackIndex from './BaseTrackContent/TrackIndex.vue'
import TrackMainInfo from './BaseTrackContent/TrackMainInfo.vue'
import TrackListenersCount from './BaseTrackContent/TrackListenersCount.vue'
import TrackLength from './BaseTrackContent/TrackLength.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseTrackAudioIcon,
    TrackImage,
    TrackIndex,
    TrackMainInfo,
    TrackListenersCount,
    TrackLength,
    BaseSourceIcon
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isLoading: Boolean,
    isError: Boolean,
    isCurrent: Boolean,
    isWithImage: Boolean,
    isWithIndex: Boolean,
    index: Number,
    isWithArtistName: Boolean,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isWithLength: Boolean,
    isWithSource: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    isRenderImage () {
      return this.isWithImage && this.imageData
    },
    imageData () {
      return this.trackData.image
    },
    isRenderIndex () {
      return this.isWithIndex && this.index >= 0
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist?.name
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    isRenderListenersCount () {
      return (
        this.isWithListenersCount &&
          this.topTrackCount
      )
    },
    listenersCount () {
      return this.trackData.listeners_count
    },
    isRenderLength () {
      return this.isWithLength && this.length
    },
    length () {
      return this.trackData.length
    },
    sourceId () {
      if (this.audioData?.present) {
        return this.audioData.source
      } else {
        return null
      }
    },
    audioData () {
      return this.trackData.audio
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.track-play-button
  @extend .no-padding
  min-width: unset !important
  margin: 0 $trackContentMarginWidth !important

.content
  @extend .no-padding
  margin-left: $trackContentMarginWidth

.track-index-main-info
  @extend .d-flex, .align-items-center

.track-source-icon
  @extend .no-padding
  min-width: unset !important
  margin-left: $trackContentMarginWidth !important
</style>
