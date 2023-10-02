<template>
  <BaseAlbumLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
    :class="{
      disabled: isDeleted
    }"
    :album-data="albumData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    @link-click="handleLinkClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="album"
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="isWithModelIcon"
        class="main-simple-list-item-model-icon"
        icon="album"
      />

      <BaseImage
        class="rounded-medium image-50"
        model="album"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isMainLinkActive
          }"
          :text="albumTitle"
        />

        <BaseAlbumArtistsSection
          v-if="isRenderArtistName"
          class="extra"
          :album-data="albumData"
          :is-link-to-library="isLinkToLibrary"
          :profile-id="profileId"
          @link-active-change="handleArtistLinkActiveChange"
          @link-click="handleLinkClick"
        />

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description listeners-count"
          :album-title="albumTitle"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :album-data="albumData"
          :profile-id="profileId"
          :top-tracks-count="topTracksCount"
          @link-active-change="handleCounterLinkActiveChange"
          @link-click="handleLinkClick"
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

      <BaseSourceIcon
        v-if="isRenderSource"
        class="right"
        :source="source"
      />

      <BaseAlbumReleaseDateSection
        class="description right"
        :album-data="albumData"
      />

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="albumData"
      />

      <BaseAlbumOptionsPopup
        class="invisible-item"
        :album-data="albumData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-link-to-library="isLinkToLibrary"
        :is-bookmark="isBookmark"
        :is-favorite="isFavorite"
        :is-with-page-option="isWithPageOption"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
        :is-with-delete-option="isWithDeleteOption"
        @link-click="handleLinkClick"
        @deleted="handleDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />
    </template>
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseAlbumArtistsSection
  from '@/components/models/album/BaseAlbumArtistsSection.vue'
import BaseAlbumReleaseDateSection
  from '@/components/models/album/BaseAlbumReleaseDateSection.vue'
import BaseAlbumListenersCount
  from '@/components/models/album/BaseAlbumListenersCount.vue'
import LibraryCountersSection from './AlbumItem/LibraryCountersSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseAlbumOptionsPopup
  from '@/components/popups/album/BaseAlbumOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseDeletedSection,
    BaseIcon,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistsSection,
    BaseAlbumReleaseDateSection,
    BaseAlbumListenersCount,
    LibraryCountersSection,
    BaseSourceIcon,
    BaseSelfIcons,
    BaseCreatedSection,
    BaseAlbumOptionsPopup,
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
    albumData: {
      type: Object,
      required: true
    },
    isWithArtistName: Boolean,
    isWithMultipleArtistNames: Boolean,
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithLibrary: Boolean,
    topTracksCount: Number,
    isWithSelfIcons: Boolean,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isWithSource: Boolean,
    profileId: String,
    isWithCreated: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isArtistLinkActive: false,
      isCounterLinkActive: false
    }
  },
  computed: {
    modelData () {
      return this.albumData
    },
    artistName () {
      return this.albumData.artist.name
    },
    artists () {
      return this.albumData.artists
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
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
    },
    isDeleted () {
      return !!this.albumData.isDeleted
    },
    isMainLinkActive () {
      return !(
        this.isArtistLinkActive ||
          this.isCounterLinkActive
      )
    },
    isRenderSource () {
      return (
        this.isWithSource &&
          this.source &&
          !this.isLastfmSource
      )
    },
    source () {
      return this.sourceData?.name
    },
    sourceData () {
      return this.albumData.source
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    },
    isRenderArtistName () {
      return (
        this.isWithArtistName || (
          this.isWithMultipleArtistNames &&
            this.artists?.length > 1
        )
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
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
      this.paginationItem.isDeleted = true
    },
    handleListenersCountLoadEnd (
      value
    ) {
      if (this.paginationItem) {
        this.paginationItem
          .listeners_count = value
      }
    },
    handleArtistLinkActiveChange (
      value
    ) {
      this.isArtistLinkActive = value
    },
    handleCounterLinkActiveChange (
      value
    ) {
      this.isCounterLinkActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
