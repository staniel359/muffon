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
        :trackExtraTitle="trackExtraTitle"
        :isWithArtistName="isWithArtistName"
        :artistName="artistName"
        :artists="artists"
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

  <TrackDuration
    v-if="isRenderDuration"
    :duration="duration"
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
import TrackDuration from './BaseTrackContent/TrackDuration.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseTrackAudioIcon,
    TrackImage,
    TrackIndex,
    TrackMainInfo,
    TrackListenersCount,
    TrackDuration,
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
    isWithDuration: Boolean,
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
    trackExtraTitle () {
      return this.trackData.extra_title
    },
    artistName () {
      return this.trackData.artist?.name
    },
    artists () {
      return this.trackData.artists
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
    isRenderDuration () {
      return (
        this.isWithDuration &&
          this.duration &&
            this.duration !== '00:00'
      )
    },
    duration () {
      return this.trackData.duration
    },
    sourceId () {
      if (this.audioData?.present) {
        return this.audioData.source_id
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
