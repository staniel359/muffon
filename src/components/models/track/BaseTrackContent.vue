<template>
  <BaseDeletedSection
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

    <template
      v-if="isRenderImage"
    >
      <BaseImage
        v-if="isWithImage"
        class="rounded-medium bordered small"
        model="track"
        :image="imageData?.extrasmall"
      />
      <BaseArtistImage
        v-else-if="isWithArtistImage"
        class="small"
        size="extrasmall"
        :artist-name="artistName"
        :image-data="artistImageData"
        @load-end="handleArtistImageLoadEnd"
      />
    </template>

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
      :is-with-bookmark-icon="isWithBookmarkIcon"
    />

    <BaseDurationSection
      v-if="isRenderDuration"
      class="description track-duration"
      :duration="duration"
    />

    <div
      v-if="isRenderSavedIcon"
      class="track-saved-icon"
    >
      <BaseIcon
        icon="save"
      />
    </div>

    <BaseSourceIcon
      v-if="isRenderSource"
      class="track-source-icon"
      :source="source"
    />

    <BaseCreatedSection
      v-if="isWithCreated"
      class="description right"
      :model-data="trackData"
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
      @delete-option-click="handleDeleteOptionClick"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />

    <BaseBookmarkDeleteModal
      v-if="isBookmark"
      ref="deleteModal"
      model="track"
      :model-data="trackData"
      @success="handleDeleted"
    />
    <BaseFavoriteDeleteModal
      v-else-if="isFavorite && isSelf"
      ref="deleteModal"
      model="track"
      :model-data="trackData"
      @success="handleDeleted"
    />
    <BasePlaylistTrackDeleteModal
      v-else-if="isPlaylistTrack && isSelf"
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
      v-else-if="isLinkToLibrary && isSelf"
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
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseTrackAudioIcon
  from '@/components/models/track/BaseTrackAudioIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import IndexBlock from './BaseTrackContent/IndexBlock.vue'
import TitleSection from './BaseTrackContent/TitleSection.vue'
import ArtistsSection from './BaseTrackContent/ArtistsSection.vue'
import AlbumSection from './BaseTrackContent/AlbumSection.vue'
import ListenersCountSection
  from './BaseTrackContent/ListenersCountSection.vue'
import BaseDurationSection from '@/components/sections/BaseDurationSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseTrackOptionsDropdown
  from '@/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '@/components/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseSavedTrackDeleteModal
  from '@/components/modals/saved_tracks/BaseSavedTrackDeleteModal.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'BaseTrackContent',
  components: {
    BaseDeletedSection,
    BaseTrackAudioIcon,
    BaseImage,
    BaseArtistImage,
    IndexBlock,
    TitleSection,
    ArtistsSection,
    AlbumSection,
    ListenersCountSection,
    BaseDurationSection,
    BaseIcon,
    BaseSourceIcon,
    BaseSelfIcons,
    BaseCreatedSection,
    BaseTrackOptionsDropdown,
    BaseClearButton,
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
          this.duration
      )
    },
    duration () {
      return (
        this.trackData.duration_seconds ||
          this.trackData.duration
      )
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
    }
  }
}
</script>

<style lang="sass" scoped>
.track-play-button
  @extend .no-padding
  min-width: unset !important
  margin: 0 1em 0 0.5em !important

.content
  @extend .d-flex, .align-items-center

.track-main-info-block
  @extend .flex-full

.track-saved-icon
  margin-left: 0.75em
  .icon
    @extend .no-margin

.track-source-icon
  margin-left: 0.75em

.track-duration
  margin-left: 0.75em
</style>
