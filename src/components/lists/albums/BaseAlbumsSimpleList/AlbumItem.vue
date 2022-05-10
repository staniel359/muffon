<template>
  <BaseAlbumLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :album-data="albumData"
    :artist-name="artistName"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-link-active="isMainLinkActive"
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

        <BaseAlbumArtistNamesSection
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
        @delete-option-click="handleDeleteOptionClick"
        @link-click="handleLinkClick"
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
  from '*/components/containers/album/BaseAlbumLinkContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseAlbumArtistNamesSection
  from '*/components/models/album/BaseAlbumArtistNamesSection.vue'
import BaseAlbumListenersCount
  from '*/components/models/album/BaseAlbumListenersCount.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    BaseHeader,
    BaseAlbumArtistNamesSection,
    BaseAlbumListenersCount,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
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
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    profileId: String
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
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
      return this.albumData.artist?.name
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
          'deleteButtonClick',
          {
            uuid: this.uuid
          }
        )
      } else {
        this.showDeleteModal()
      }
    },
    handleDeleted () {
      this.paginationItem
        .isDeleted = true
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
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

<style lang="sass" scoped></style>
