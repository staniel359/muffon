<template>
  <BaseAlbumLinkContainer
    :album-data="albumData"
    :profile-id="profileId"
    :artist-name="albumArtistName"
    :is-link-to-library="isLinkToLibrary"
    :is-artist-name-active="isArtistNameActive"
    :is-tracks-active="isTracksActive"
    @link-click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      model="album"
      :image="imageData?.medium"
    >
      <BaseOptionsDropdown
        class="options"
        model="album"
        :artist-name="albumArtistName"
        :album-title="albumTitle"
        :image-url="imageData?.original"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-transparent="false"
        @link-click="handleLinkClick"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isHeaderActive
          }"
          :text="albumTitle"
        />

        <ArtistNameSection
          v-if="isWithArtistName"
          :artist-name="albumArtistName"
          :is-artist-name-active="isArtistNameActive"
          @active-change="handleArtistNameActiveChange"
        />

        <div
          v-if="releaseDate"
          class="description"
          v-text="releaseDate"
        />

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description"
          :album-title="albumTitle"
          :artist-name="albumArtistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <TracksSection
          v-if="isWithLibrary"
          :album-data="albumData"
          :is-tracks-active="isTracksActive"
          @active-change="handleTracksActiveChange"
        />

        <BaseSelfIcons
          v-if="isWithSelfIcons"
          :library-id="libraryId"
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :listened-id="listenedId"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '*/components/containers/album/BaseAlbumLinkContainer.vue'
import BaseSimpleCardContainer
  from '*/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import ArtistNameSection from './AlbumItem/ArtistNameSection.vue'
import BaseAlbumListenersCount
  from '*/components/models/album/BaseAlbumListenersCount.vue'
import TracksSection from './AlbumItem/TracksSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseSimpleCardContainer,
    BaseOptionsDropdown,
    BaseHeader,
    ArtistNameSection,
    BaseAlbumListenersCount,
    TracksSection,
    BaseSelfIcons
  },
  mixins: [
    selfMixin
  ],
  inject: [
    'findPaginationItem'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isArtistNameActive: false,
      isTracksActive: false
    }
  },
  computed: {
    modelData () {
      return this.albumData
    },
    albumArtistName () {
      if (this.artists) {
        return formatArtistName(
          this.artists
        )
      } else {
        return this.artistName
      }
    },
    artists () {
      if (this.artistData) {
        return [
          this.artistData
        ]
      } else {
        return this.albumData.artists
      }
    },
    artistData () {
      return this.albumData.artist
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    isHeaderActive () {
      return !(
        this.isArtistNameActive ||
          this.isTracksActive
      )
    },
    releaseDate () {
      return this.albumData.release_date
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.albumData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleArtistNameActiveChange (
      value
    ) {
      this.isArtistNameActive = value
    },
    handleTracksActiveChange (
      value
    ) {
      this.isTracksActive = value
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .flex-column, .align-items-center
</style>
