<template>
  <BaseDeletedBlock
    v-if="isDeleted"
    model="track"
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
            :albumData="albumData"
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

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
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

    <BaseOptionsDropdown
      model="track"
      :modelId="trackTrackId"
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
      :isWithLibraryOption="isWithLibraryOption"
      :isWithFavoriteOption="isWithFavoriteOption"
      :isWithBookmarkOption="isWithBookmarkOption"
      :isWithListenedOption="isWithListenedOption"
      :isWithPlaylistOption="isWithPlaylistOption"
      :isWithDeleteOption="isWithDeleteOption"
      :albumTitle="albumTitle"
      :imageUrl="imageData?.medium"
      @delete="handleDeleteOptionClick"
      @playlist="handlePlaylistOptionClick"
      @linkClick="handleLinkClick"
    />

    <BasePlaylistsModal
      ref="playlistModal"
      :trackId="trackTrackId"
      :albumTitle="albumTitle"
      :imageUrl="imageData?.medium"
    />

    <BaseBookmarkDeleteModal
      v-if="isBookmark"
      ref="deleteModal"
      model="track"
      :modelData="trackData"
      @deleted="handleDeleted"
    />
    <BaseFavoriteDeleteModal
      v-else-if="isFavorite"
      ref="deleteModal"
      model="track"
      :modelData="trackData"
      @deleted="handleDeleted"
    />
    <BasePlaylistTrackDeleteModal
      v-else-if="isPlaylistTrack"
      ref="deleteModal"
      :playlistTrackData="trackData"
      :playlistId="playlistId"
      :playlistTitle="playlistTitle"
      @deleted="handleDeleted"
    />
    <BaseProfileLibraryDeleteModal
      v-else-if="isLinkToLibrary"
      ref="deleteModal"
      model="track"
      :profileId="profileId"
      :modelId="trackId"
      :modelTitle="trackFullTitle"
      @deleted="handleDeleted"
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
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/BasePlaylistsModal.vue'
import BaseBookmarkDeleteModal from '@/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal from '@/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal from '@/BasePlaylistTrackDeleteModal.vue'
import BaseProfileLibraryDeleteModal
  from '@/models/profile/library/BaseProfileLibraryDeleteModal.vue'
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'

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
    BaseSelfIcons,
    BaseOptionsDropdown,
    BasePlaylistsModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BasePlaylistTrackDeleteModal,
    BaseProfileLibraryDeleteModal
  },
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
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
    playlistTitle: String,
    isDeleted: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick',
    'deleted'
  ],
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
  },
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
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.albums?.[0]
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
    trackTrackId () {
      return (
        this.trackData.track_id ||
          this.trackId
      )?.toString()
    },
    artistId () {
      return this.trackData.artist.id?.toString()
    },
    albumId () {
      return this.albumData?.id?.toString()
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
    trackFullTitle () {
      return `${this.artistName} - ${this.trackTitle}`
    }
  },
  mounted () {
    this.libraryId =
      this.trackData.library_id?.toString()
    this.favoriteId =
      this.trackData.favorite_id?.toString()
    this.bookmarkId =
      this.trackData.bookmark_id?.toString()
    this.listenedId =
      this.trackData.listened_id?.toString()
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteButtonClick',
          { uuid: this.uuid }
        )
      } else {
        this.$refs.deleteModal.show()
      }
    },
    handlePlaylistOptionClick () {
      this.$refs.playlistModal.show()
    },
    handleDeleted () {
      this.$emit('deleted')
    },
    setLibraryId (value) {
      this.libraryId = value
    },
    setFavoriteId (value) {
      this.favoriteId = value
    },
    setBookmarkId (value) {
      this.bookmarkId = value
    },
    setListenedId (value) {
      this.listenedId = value
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

.created-container
  margin-left: $trackContentMarginWidth !important
  text-align: right
</style>
