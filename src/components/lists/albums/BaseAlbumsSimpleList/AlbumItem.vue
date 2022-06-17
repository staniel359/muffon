<template>
  <BaseAlbumLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :album-data="albumData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    @link-click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="album"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
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
          v-if="isWithArtistName"
          :album-data="albumData"
          :is-link-to-library="isLinkToLibrary"
          :profile-id="profileId"
          @link-active-change="handleArtistLinkActiveChange"
          @link-click="handleLinkClick"
        />

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description"
          :album-title="albumTitle"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />
      </div>

      <BaseSourceIcon
        v-if="isWithSource"
        class="album-source-icon"
        :source="source"
      />

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />

      <BaseOptionsDropdown
        model="album"
        :artist-name="artistName"
        :album-title="albumTitle"
        :image-url="imageData?.large"
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

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="album"
        :model-data="albumData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="album"
        :model-data="albumData"
        @success="handleDeleted"
      />
    </template>
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '*/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseAlbumArtistsSection
  from '*/components/models/album/BaseAlbumArtistsSection.vue'
import BaseAlbumListenersCount
  from '*/components/models/album/BaseAlbumListenersCount.vue'
import BaseSourceIcon from '*/components/BaseSourceIcon.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  album as formatAlbumShareData
} from '*/helpers/formatters/share'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistsSection,
    BaseAlbumListenersCount,
    BaseSourceIcon,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseClearButton,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
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
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithSelfIcons: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isWithSource: Boolean,
    profileId: String
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isArtistLinkActive: false
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
      return !this.isArtistLinkActive
    },
    shareData () {
      return formatAlbumShareData(
        this.albumData
      )
    },
    source () {
      return this.albumData.source?.name
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
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
      this.paginationItem
        .isDeleted = true
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
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.album-source-icon
  margin-left: 0.5em !important
</style>
