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

    <div class="track-image-container">
      <BaseImage
        v-if="isWithImage"
        class="rounded bordered"
        model="track"
        :image="imageData?.extrasmall"
      />
    </div>

    <div class="content">
      <div class="track-index-main-info-listeners">
        <div class="track-index-main-info">
          <TrackIndex
            v-if="isRenderIndex"
            :index="index"
          />

          <div class="track-main-info">
            <TrackTitle
              :trackData="trackData"
              :artistName="artistName"
              :isLinkToLibrary="isLinkToLibrary"
              :profileId="profileId"
              :trackId="trackId"
              @linkClick="handleLinkClick"
            />

            <TrackArtistName
              v-if="isRenderArtistName"
              :artists="artists"
              :isLinkToLibrary="isLinkToLibrary"
              :profileId="profileId"
              @linkClick="handleLinkClick"
            />

            <TrackAlbumTitle
              v-if="isRenderAlbumTitle"
              :albumData="albumData"
              :artistName="artistName"
              :isLinkToLibrary="isLinkToLibrary"
              :profileId="profileId"
              :albumId="albumId"
              @linkClick="handleLinkClick"
            />
          </div>
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
      :trackTitle="trackTitle"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :imageUrl="imageData?.original"
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
      @delete="handleDeleteOptionClick"
      @playlist="handlePlaylistOptionClick"
      @linkClick="handleLinkClick"
    />

    <BasePlaylistsModal
      ref="playlistModal"
      :trackTitle="trackTitle"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :imageUrl="imageData?.original"
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
      :modelName="trackFullTitle"
      @deleted="handleDeleted"
    />
  </template>
</template>

<script>
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseTrackAudioIcon from '@/models/track/BaseTrackAudioIcon.vue'
import BaseImage from '@/images/BaseImage.vue'
import TrackIndex from './BaseTrackContent/TrackIndex.vue'
import TrackTitle from './BaseTrackContent/TrackTitle.vue'
import TrackArtistName from './BaseTrackContent/TrackArtistName.vue'
import TrackAlbumTitle from './BaseTrackContent/TrackAlbumTitle.vue'
import TrackListenersCount from './BaseTrackContent/TrackListenersCount.vue'
import TrackDuration from './BaseTrackContent/TrackDuration.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/modals/playlists/BasePlaylistsModal.vue'
import BaseBookmarkDeleteModal
  from '@/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '@/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseDeletedBlock,
    BaseTrackAudioIcon,
    BaseImage,
    TrackIndex,
    TrackTitle,
    TrackArtistName,
    TrackAlbumTitle,
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
    imageData () {
      return this.trackData.image
    },
    isRenderIndex () {
      return (
        this.isWithIndex &&
          this.index >= 0
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    },
    isRenderArtistName () {
      return (
        this.isWithArtistName && (
          !this.albumArtistName ||
            this.isDifferentNames
        )
      )
    },
    isDifferentNames () {
      return (
        this.artistName.toLowerCase() !==
          this.albumArtistName.toLowerCase()
      )
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      if (this.artistData) {
        return [this.artistData]
      } else {
        return this.trackData.artists
      }
    },
    artistData () {
      return this.trackData.artist
    },
    isRenderAlbumTitle () {
      return (
        this.isWithAlbumTitle &&
          this.albumTitle
      )
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
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
      return [
        this.artistName,
        this.trackTitle
      ].join(' - ')
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
  margin: 0 0.5em !important

.track-image-container
  margin-left: 0.5em
  .image
    width: 30px
    height: 30px

.content
  @extend .d-flex, .align-items-center
  margin-left: 0.5em

.track-index-main-info-listeners
  @extend .flex-full

.track-index-main-info
  @extend .d-flex, .align-items-center

.track-main-info
  @extend .flex-full

.main-simple-self-buttons-container
  margin-left: 0.5em

.track-source-icon
  @extend .no-padding
  min-width: unset !important
  margin-left: 0.5em !important

.created-container
  margin-left: 0.5em !important
  text-align: right
</style>
