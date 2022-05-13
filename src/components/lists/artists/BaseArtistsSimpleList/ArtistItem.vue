<template>
  <BaseArtistLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :artist-data="artistData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-link-active="isMainLinkActive"
    @link-click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="artist"
    />
    <template v-else>
      <BaseArtistImage
        class="circular bordered"
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
      />

      <BaseOptionsDropdown
        model="artist"
        :artist-name="artistName"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :share-data="shareData"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        @delete-option-click="handleDeleteOptionClick"
        @link-click="handleLinkClick"
      />

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
    </template>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '*/components/containers/artist/BaseArtistLinkContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '*/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  artist as formatArtistShareData
} from '*/helpers/formatters/share'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseDeletedBlock,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
  },
  mixins: [
    selfMixin
  ],
  inject: {
    findPaginationItem: {
      default: () => false
    },
    findListItem: {
      default: () => false
    }
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
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
    isClearable: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
  ],
  data () {
    return {
      isCounterLinkActive: false
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
    item () {
      return (
        this.paginationItem ||
          this.listItem
      )
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
    listItem () {
      return this.findListItem(
        {
          uuid: this.uuid
        }
      )
    },
    shareData () {
      return formatArtistShareData(
        this.artistData
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
      this.item.image = value
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.item.listeners_count = value
    },
    handleCounterLinkActiveChange (
      value
    ) {
      this.isCounterLinkActive = value
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
    handleDeleted () {
      this.item.isDeleted = true
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
