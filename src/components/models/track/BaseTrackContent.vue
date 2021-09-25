<template>
  <BaseDeletedBlock
    v-if="isDeleted"
    :isBookmark="isBookmark"
    :isFavorite="isFavorite"
  />
  <template v-else>
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
      <div class="track-index-main-info-listeners">
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

      <div
        v-if="isWithSelfButtons"
        class="main-simple-self-buttons-container"
      >
        <BaseSelfSimpleButtons
          model="track"
          :modelData="trackData"
          :isWithLibraryLink="isWithLibraryLink"
          :isWithListenedButton="isWithListenedButton"
          :isWithBookmarkButton="isWithBookmarkButton"
          :isWithFavoriteButton="isWithFavoriteButton"
        />
      </div>
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

    <BaseBookmarkDeleteButton
      v-if="isBookmark"
      model="track"
      :modelData="trackData"
      @deleted="handleDeleted"
    />

    <BaseFavoriteDeleteButton
      v-if="isRenderFavoriteDeleteButton"
      model="track"
      :modelData="trackData"
      @deleted="handleDeleted"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      class="delete-button"
      @click="handleDeleteButtonClick"
    />
  </template>
</template>

<script>
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseTrackAudioIcon from '@/models/track/BaseTrackAudioIcon.vue'
import TrackImage from './BaseTrackContent/TrackImage.vue'
import TrackIndex from './BaseTrackContent/TrackIndex.vue'
import TrackMainInfo from './BaseTrackContent/TrackMainInfo.vue'
import TrackListenersCount from './BaseTrackContent/TrackListenersCount.vue'
import TrackDuration from './BaseTrackContent/TrackDuration.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseSelfSimpleButtons from '@/models/self/BaseSelfSimpleButtons.vue'
import BaseBookmarkDeleteButton from '@/BaseBookmarkDeleteButton.vue'
import BaseFavoriteDeleteButton from '@/BaseFavoriteDeleteButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseDeletedBlock,
    BaseTrackAudioIcon,
    TrackImage,
    TrackIndex,
    TrackMainInfo,
    TrackListenersCount,
    TrackDuration,
    BaseSourceIcon,
    BaseSelfSimpleButtons,
    BaseBookmarkDeleteButton,
    BaseFavoriteDeleteButton,
    BaseClearButton
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isWithSelfButtons: {
      type: Boolean,
      default: true
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
    isWithBookmarkButton: Boolean,
    isWithFavoriteButton: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isDeleted: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick',
    'deleted'
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
    uuid () {
      return this.trackData.uuid
    },
    isRenderFavoriteDeleteButton () {
      return (
        this.isFavorite &&
          isCurrentProfile(this.profileId)
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.uuid }
      )
    },
    handleDeleted () {
      this.$emit('deleted')
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
  @extend .d-flex, .align-items-center
  margin-left: $trackContentMarginWidth

.track-index-main-info-listeners
  @extend .flex-full

.track-index-main-info
  @extend .d-flex, .align-items-center

.main-simple-self-buttons-container
  margin-left: $trackContentMarginWidth

.track-source-icon
  @extend .no-padding
  min-width: unset !important
  margin-left: $trackContentMarginWidth !important

.delete-button
  margin-left: $trackContentMarginWidth !important

.created-container
  margin-left: $trackContentMarginWidth !important
  text-align: right
</style>
