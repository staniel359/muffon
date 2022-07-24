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

    <IndexBlock
      v-if="isRenderIndex"
      :index="index"
    />

    <div
      v-if="isRenderImage"
      class="track-image-container"
    >
      <BaseImage
        v-if="isWithImage"
        class="rounded bordered"
        model="track"
        :image="imageData?.extrasmall"
      />
      <BaseArtistImage
        v-else-if="isWithArtistImage"
        size="extrasmall"
        :artist-name="artistName"
        :image-data="artistImageData"
        @load-end="handleArtistImageLoadEnd"
      />
    </div>

    <div class="content">
      <div class="track-main-info-block">
        <div>
          <TitleSection
            :track-data="trackData"
            :is-link-to-library="isLinkToLibrary"
            :profile-id="profileId"
            @link-click="handleLinkClick"
          />

          <ArtistsSection
            v-if="isRenderArtistName"
            :track-data="trackData"
            :is-link-to-library="isLinkToLibrary"
            :profile-id="profileId"
            @link-click="handleLinkClick"
          />

          <AlbumSection
            v-if="isRenderAlbumTitle"
            :track-data="trackData"
            :is-link-to-library="isLinkToLibrary"
            :profile-id="profileId"
            @link-click="handleLinkClick"
          />
        </div>

        <ListenersCountSection
          v-if="isRenderListenersCount"
          :listeners-count="listenersCount"
          :top-track-count="topTrackCount"
        />
      </div>
    </div>

    <BaseSelfIcons
      v-if="isWithSelfIcons"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-icon="isWithLibraryIcon"
      :is-with-favorite-icon="isWithFavoriteIcon"
    />

    <DurationBlock
      v-if="isRenderDuration"
      :duration="duration"
    />

    <BaseIcon
      v-if="isRenderSavedIcon"
      class="track-saved-icon"
      icon="save"
    />

    <BaseSourceIcon
      v-if="isRenderSource"
      class="track-source-icon"
      :source="source"
    />

    <CreatedBlock
      v-if="isWithCreated"
      :track-data="trackData"
    />

    <BaseTrackOptionsDropdown
      :track-data="trackData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-queue-option="isWithQueueOption"
      :is-with-playlist-option="isWithPlaylistOption"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      @link-click="handleLinkClick"
      @playlist-option-click="handlePlaylistOptionClick"
      @delete-option-click="handleDeleteOptionClick"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />

    <BasePlaylistsModal
      ref="playlistsModal"
      :track-data="trackData"
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
    <BaseSavedTrackDeleteModal
      v-else-if="isSavedTrack"
      ref="deleteModal"
      :track-data="trackData"
      @success="handleDeleted"
    />
    <BaseLibraryDeleteModal
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
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import IndexBlock from './BaseTrackContent/IndexBlock.vue'
import TitleSection from './BaseTrackContent/TitleSection.vue'
import ArtistsSection from './BaseTrackContent/ArtistsSection.vue'
import AlbumSection from './BaseTrackContent/AlbumSection.vue'
import ListenersCountSection
  from './BaseTrackContent/ListenersCountSection.vue'
import DurationBlock from './BaseTrackContent/DurationBlock.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseSourceIcon from '*/components/BaseSourceIcon.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import CreatedBlock from './BaseTrackContent/CreatedBlock.vue'
import BaseTrackOptionsDropdown
  from '*/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '*/components/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseSavedTrackDeleteModal
  from '*/components/modals/saved_tracks/BaseSavedTrackDeleteModal.vue'
import BaseLibraryDeleteModal
  from '*/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseDeletedBlock,
    BaseTrackAudioIcon,
    BaseImage,
    BaseArtistImage,
    IndexBlock,
    TitleSection,
    ArtistsSection,
    AlbumSection,
    ListenersCountSection,
    DurationBlock,
    BaseIcon,
    BaseSourceIcon,
    BaseSelfIcons,
    CreatedBlock,
    BaseTrackOptionsDropdown,
    BaseClearButton,
    BasePlaylistsModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BasePlaylistTrackDeleteModal,
    BaseSavedTrackDeleteModal,
    BaseLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
  inject: {
    findPaginationItem: {
      default: () => false
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
    isWithArtistImage: Boolean,
    isWithIndex: Boolean,
    index: Number,
    isWithArtistName: Boolean,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isWithSavedIcon: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    isSavedTrack: Boolean,
    playlistId: String,
    playlistTitle: String,
    isDeleted: Boolean,
    isClearable: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick',
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
      return this.artistData.name
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
    isRenderSource () {
      return (
        this.isWithSource &&
          this.isAudioPresent
      )
    },
    isAudioPresent () {
      return this.audioData?.present
    },
    audioData () {
      return this.trackData.audio
    },
    source () {
      return this.trackData.source?.name
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
    artistImageData () {
      return this.artistData.image
    },
    isRenderImage () {
      return (
        this.isWithImage ||
          this.isWithArtistImage
      )
    },
    paginationItem () {
      if (this.findPaginationItem) {
        return this.findPaginationItem(
          {
            uuid: this.uuid
          }
        )
      } else {
        return null
      }
    },
    isRenderSavedIcon () {
      return (
        this.isWithSavedIcon &&
          this.audioData?.local
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
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    handleArtistImageLoadEnd (
      value
    ) {
      if (this.paginationItem) {
        this.paginationItem.artist.image = value
      }
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
  & > .image
    width: 30px
    height: 30px

.content
  @extend .d-flex, .align-items-center
  margin-left: 0.5em

.track-main-info-block
  @extend .flex-full

.main-simple-self-buttons-container
  margin-left: 0.5em

.track-saved-icon
  margin-left: 0.5em !important

.track-source-icon
  margin-left: 0.5em !important
</style>
