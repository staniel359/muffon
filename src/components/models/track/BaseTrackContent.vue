<template>
  <BaseDeletedSection
    v-if="isDeleted"
    :model="model"
  />
  <template
    v-else
  >
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
        class="rounded-medium image-35"
        model="track"
        :image="imageData?.extrasmall"
      />
      <BaseArtistImage
        v-else-if="isWithArtistImage"
        class="image-35"
        size="extrasmall"
        :artist-name="artistName"
        :image-data="artistImageData"
        @load-end="handleArtistImageLoadEnd"
      />
    </template>

    <div class="content">
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
        :track-data="trackData"
        :top-track-count="topTrackCount"
      />
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

    <RecommendationTracksSection
      v-if="isRecommendation"
      class="description right main-right-small-section"
      :recommendation-data="trackData"
    />

    <BaseDurationSection
      v-if="isRenderDuration"
      class="description right main-right-small-section"
      :duration="duration"
    />

    <div
      v-if="isRenderSource || isRenderSavedIcon"
      class="middle-aligned-column main-right-small-section"
    >
      <BaseSourceIcon
        v-if="isRenderSource"
        class="main-list-bottom-mini-icon"
        :source="source"
      />

      <BaseIcon
        v-if="isRenderSavedIcon"
        class="main-list-bottom-mini-icon"
        icon="savedTrack"
      />
    </div>

    <BaseCreatedSection
      v-if="isWithCreated"
      class="description right"
      :model-data="trackData"
    />

    <BaseTrackOptionsPopup
      class="invisible-item"
      :track-data="trackData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-link-to-library="isLinkToLibrary"
      :is-bookmark="isBookmark"
      :is-favorite="isFavorite"
      :is-playlist-track="isPlaylistTrack"
      :is-recommendation="isRecommendation"
      :playlist-id="playlistId"
      :playlist-title="playlistTitle"
      :is-with-page-option="isWithPageOption"
      :is-with-source-option="isWithSourceOption"
      :is-with-library-option="isWithLibraryOption"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-listened-option="isWithListenedOption"
      :is-with-queue-option="isWithQueueOption"
      :is-with-playlist-option="isWithPlaylistOption"
      :is-with-save-option="isWithSaveOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      @link-click="handleLinkClick"
      @source-click="handleSourceClick"
      @delete-option-click="handleDeleteOptionClick"
      @deleted="handleDeleted"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
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
import BaseDurationSection
  from '@/components/sections/BaseDurationSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import RecommendationTracksSection
  from './BaseTrackContent/RecommendationTracksSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseTrackOptionsPopup
  from '@/components/popups/track/BaseTrackOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
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
    RecommendationTracksSection,
    BaseDurationSection,
    BaseSourceIcon,
    BaseIcon,
    BaseSelfIcons,
    BaseCreatedSection,
    BaseTrackOptionsPopup,
    BaseClearButton
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
    isWithPageOption: Boolean,
    isWithSourceOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithSaveOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    playlistId: String,
    playlistTitle: String,
    isDeleted: Boolean,
    isClearable: Boolean,
    isRecommendation: Boolean
  },
  emits: [
    'linkClick',
    'sourceClick',
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
          this.source &&
          !this.isLastfmSource &&
          this.isAudioPresent
      )
    },
    source () {
      return this.sourceData?.name
    },
    sourceData () {
      return this.trackData.source
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    },
    isAudioPresent () {
      return this.audioData?.present
    },
    audioData () {
      return this.trackData.audio
    },
    uuid () {
      return this.trackData.uuid
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
    },
    model () {
      if (this.isRecommendation) {
        return 'recommendation'
      } else {
        return 'track'
      }
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleSourceClick (
      value
    ) {
      this.$emit(
        'sourceClick',
        value
      )
    },
    handleDeleteOptionClick () {
      this.$emit(
        'deleteOptionClick',
        {
          uuid: this.uuid
        }
      )
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
    }
  }
}
</script>

<style lang="sass" scoped>
.track-play-button
  margin: 0 0.5rem !important
</style>
