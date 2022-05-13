<template>
  <BaseDeletedBlock
    v-if="isDeleted"
    model="track"
  />
  <template v-else>
    <BaseTrackAudioIcon
      class="track-play-button"
      :is-loading="isLoading"
      :is-error="isError"
      :is-current="isCurrent"
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
          <IndexBlock
            v-if="isRenderIndex"
            :index="index"
          />

          <div class="track-main-info">
            <TitleSection
              :track-data="trackData"
              :artist-name="artistName"
              :is-link-to-library="isLinkToLibrary"
              :profile-id="profileId"
              @link-click="handleLinkClick"
            />

            <ArtistNameSection
              v-if="isRenderArtistName"
              :track-data="trackData"
              :is-link-to-library="isLinkToLibrary"
              :profile-id="profileId"
              @link-click="handleLinkClick"
            />

            <AlbumTitleSection
              v-if="isRenderAlbumTitle"
              :track-data="trackData"
              :is-link-to-library="isLinkToLibrary"
              :profile-id="profileId"
              @link-click="handleLinkClick"
            />
          </div>
        </div>

        <ListenersCountSection
          v-if="isRenderListenersCount"
          :listeners-count="listenersCount"
          :top-track-count="topTrackCount"
        />
      </div>

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />
    </div>

    <DurationBlock
      v-if="isRenderDuration"
      :duration="duration"
    />

    <BaseSourceIcon
      v-if="isWithSource"
      class="track-source-icon"
      :source-id="sourceId"
    />

    <CreatedBlock
      v-if="isWithCreated"
      :track-data="trackData"
    />

    <BaseOptionsDropdown
      model="track"
      :track-title="trackTitle"
      :artist-name="artistName"
      :album-title="albumTitle"
      :image-url="imageData?.original"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :share-data="shareData"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-playlist-option="isWithPlaylistOption"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      @delete-option-click="handleDeleteOptionClick"
      @playlist-option-click="handlePlaylistOptionClick"
      @link-click="handleLinkClick"
    />

    <BasePlaylistsModal
      ref="playlistsModal"
      :track-title="trackTitle"
      :artist-name="artistName"
      :album-title="albumTitle"
      :image-url="imageData?.original"
    />

    <BaseBookmarkDeleteModal
      v-if="isBookmark"
      ref="deleteModal"
      model="track"
      :model-data="trackData"
      @success="handleDeleted"
    />
    <BaseFavoriteDeleteModal
      v-else-if="isFavorite"
      ref="deleteModal"
      model="track"
      :model-data="trackData"
      @success="handleDeleted"
    />
    <BasePlaylistTrackDeleteModal
      v-else-if="isPlaylistTrack"
      ref="deleteModal"
      :playlist-track-data="trackData"
      :playlist-id="playlistId"
      :playlist-title="playlistTitle"
      @success="handleDeleted"
    />
    <BaseProfileLibraryDeleteModal
      v-else-if="isLinkToLibrary"
      ref="deleteModal"
      model="track"
      :profile-id="profileId"
      :model-id="libraryTrackId"
      :model-name="trackFullTitle"
      @success="handleDeleted"
    />
  </template>
</template>

<script>
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseTrackAudioIcon
  from '*/components/models/track/BaseTrackAudioIcon.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import IndexBlock from './BaseTrackContent/IndexBlock.vue'
import TitleSection from './BaseTrackContent/TitleSection.vue'
import ArtistNameSection from './BaseTrackContent/ArtistNameSection.vue'
import AlbumTitleSection from './BaseTrackContent/AlbumTitleSection.vue'
import ListenersCountSection from './BaseTrackContent/ListenersCountSection.vue'
import DurationBlock from './BaseTrackContent/DurationBlock.vue'
import BaseSourceIcon from '*/components/BaseSourceIcon.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import CreatedBlock from './BaseTrackContent/CreatedBlock.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '*/components/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseProfileLibraryDeleteModal
  from '*/components/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  track as formatTrackShareData
} from '*/helpers/formatters/share'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseDeletedBlock,
    BaseTrackAudioIcon,
    BaseImage,
    IndexBlock,
    TitleSection,
    ArtistNameSection,
    AlbumTitleSection,
    ListenersCountSection,
    DurationBlock,
    BaseSourceIcon,
    BaseSelfIcons,
    CreatedBlock,
    BaseOptionsDropdown,
    BasePlaylistsModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BasePlaylistTrackDeleteModal,
    BaseProfileLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
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
    isWithShareOption: Boolean,
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
    'deleteOptionClick',
    'deleted'
  ],
  computed: {
    modelData () {
      return this.trackData
    },
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
      return this.trackData.artist.name
    },
    isRenderAlbumTitle () {
      return (
        this.isWithAlbumTitle &&
          this.albumTitle
      )
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
    libraryTrackId () {
      return this.trackData.library.id.toString()
    },
    uuid () {
      return this.trackData.uuid
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    shareData () {
      return formatTrackShareData(
        this.trackData
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteOptionClick',
          {
            uuid: this.uuid
          }
        )
      } else {
        this.showDeleteModal()
      }
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
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
</style>
