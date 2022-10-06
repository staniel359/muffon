<template>
  <BaseArtistLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :artist-data="artistData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-link-active="isLinkActive"
    @link-click="handleLinkClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="artist"
    />
    <template v-else>
      <BaseArtistImage
        size="extrasmall"
        :class="{
          small: isImageSmall
        }"
        :image-data="imageData"
        :artist-name="artistName"
        @load-end="handleImageLoadEnd"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isMainLinkActive
          }"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :artist-data="artistData"
          :profile-id="profileId"
          :top-tracks-count="topTracksCount"
          :top-albums-count="topAlbumsCount"
          @link-active-change="handleCounterLinkActiveChange"
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

      <BaseArtistOptionsDropdown
        :artist-data="artistData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        @active-change="handleOptionsActiveChange"
        @link-click="handleLinkClick"
        @delete-option-click="handleDeleteOptionClick"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
        @active-change="handleClearButtonActiveChange"
      />

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite && isSelf"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
      <BaseLibraryDeleteModal
        v-else-if="isLinkToLibrary && isSelf"
        ref="deleteModal"
        model="artist"
        :profile-id="profileId"
        :model-id="libraryArtistId"
        :model-name="artistName"
        @success="handleDeleted"
      />
    </template>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsDropdown
  from '@/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseDeletedSection,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseArtistOptionsDropdown,
    BaseClearButton,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
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
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: Boolean,
    isWithListenersCount: Boolean,
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPaginated: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isCounterLinkActive: false,
      isOptionsActive: false,
      isClearButtonActive: false
    }
  },
  computed: {
    modelData () {
      return this.artistData
    },
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    isMainLinkActive () {
      return !this.isCounterLinkActive
    },
    isDeleted () {
      return !!this.artistData.isDeleted
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.artistData.uuid
    },
    libraryArtistId () {
      return this.artistData.library.id.toString()
    },
    isLinkActive () {
      return !(
        this.isCounterLinkActive ||
          this.isOptionsActive ||
          this.isClearButtonActive
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleImageLoadEnd (
      value
    ) {
      if (this.isPaginated) {
        this.paginationItem.image = value
      }
    },
    handleListenersCountLoadEnd (
      value
    ) {
      if (this.isPaginated) {
        this.paginationItem.listeners_count = value
      }
    },
    handleCounterLinkActiveChange (
      value
    ) {
      this.isCounterLinkActive = value
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
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
      if (this.isPaginated) {
        this.paginationItem.isDeleted = true
      }
    },
    handleOptionsActiveChange (
      value
    ) {
      this.isOptionsActive = value
    },
    handleClearButtonActiveChange (
      value
    ) {
      this.isClearButtonActive = value
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
