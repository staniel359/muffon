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
        :isLinkToLibrary="isLinkToLibrary"
        :profileId="profileId"
        :trackId="trackId"
        :artistId="artistId"
        :albumId="albumId"
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

  <div
    v-if="isWithCreated"
    class="main-small-container created-container"
  >
    <div>
      <small>
        {{ createdDateFormatted }}
      </small>
    </div>

    <div>
      <small>
        {{ createdTimeFormatted }}
      </small>
    </div>
  </div>

  <div class="main-simple-self-buttons">
    <BaseLibrarySimpleButton
      v-if="isShowLibraryLink"
      class="main-simple-self-button"
      model="track"
      :modelId="libraryId"
    />

    <BaseListenedSimpleButton
      v-if="isShowListenedButton"
      class="main-simple-self-button"
      model="track"
      :modelId="listenedId"
    />
  </div>

  <BaseClearButton
    v-if="isWithClearButton"
    class="delete-button"
    @click="handleDeleteButtonClick"
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
import BaseLibrarySimpleButton from '@/models/self/BaseLibrarySimpleButton.vue'
import BaseListenedSimpleButton
  from '@/models/self/BaseListenedSimpleButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseTrackAudioIcon,
    TrackImage,
    TrackIndex,
    TrackMainInfo,
    TrackListenersCount,
    TrackDuration,
    BaseSourceIcon,
    BaseLibrarySimpleButton,
    BaseListenedSimpleButton,
    BaseClearButton
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
    isWithSource: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
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
    isRenderImage () {
      return (
        this.isWithImage &&
          this.imageData
      )
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
    },
    trackId () {
      return this.trackData.id?.toString()
    },
    artistId () {
      return this.trackData.artist.id?.toString()
    },
    albumId () {
      return this.trackData.album?.id?.toString()
    },
    isShowLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.trackData.library_id?.toString()
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.trackData.created
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    },
    isShowListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.trackData.listened_id?.toString()
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.trackData.uuid }
      )
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

.main-simple-self-buttons
  margin-left: $trackContentMarginWidth !important

.delete-button
  margin-left: $trackContentMarginWidth !important

.created-container
  margin-left: $trackContentMarginWidth !important
  text-align: right
</style>
