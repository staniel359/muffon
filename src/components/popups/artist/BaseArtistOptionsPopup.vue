<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-transparent="isTransparent"
    @active-change="handleActiveChange"
  >
    <template
      #default="slotProps"
    >
      <PageOption
        v-if="isWithPageOption"
        :artist-data="artistData"
        @click="handleLinkClick"
      />

      <LibraryOption
        v-if="isRenderLibraryOption"
        :library-id="libraryId"
        :artist-data="artistData"
        @link-click="handleLinkClick"
      />

      <FavoriteOption
        v-if="isRenderFavoriteOption"
        :favorite-id="favoriteId"
        :artist-data="artistData"
      />

      <BookmarkOption
        v-if="isRenderBookmarkOption"
        :bookmark-id="bookmarkId"
        :artist-data="artistData"
      />

      <ListenedOption
        v-if="isRenderListenedOption"
        :listened-id="listenedId"
        :artist-data="artistData"
      />

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="artist"
        :model-data="artistData"
      />

      <template
        v-if="isRenderDeleteOption"
      >
        <BaseDeleteOption
          @click="handleDeleteOptionClick"
        />

        <BaseLibraryDeleteModal
          v-if="isLinkToLibrary"
          ref="deleteModal"
          model="artist"
          :profile-id="profileId"
          :model-data="artistData"
          :is-with-redirect="isDeleteWithRedirect"
          @success="handleDeleted"
        />
        <BaseBookmarkDeleteModal
          v-else-if="isBookmark"
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
        <BaseRecommendationDeleteModal
          v-else-if="isRecommendation"
          ref="deleteModal"
          model="artist"
          :model-data="artistData"
          @success="handleDeleted"
        />
      </template>
    </template>
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import PageOption from './BaseArtistOptionsPopup/PageOption.vue'
import LibraryOption from './BaseArtistOptionsPopup/LibraryOption.vue'
import FavoriteOption from './BaseArtistOptionsPopup/FavoriteOption.vue'
import BookmarkOption from './BaseArtistOptionsPopup/BookmarkOption.vue'
import ListenedOption from './BaseArtistOptionsPopup/ListenedOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BaseRecommendationDeleteModal
  from '@/components/modals/recommendation/BaseRecommendationDeleteModal.vue'
import {
  artist as formatArtistShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseArtistOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    PageOption,
    LibraryOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    BaseShareOption,
    BaseExternalLinkOption,
    BaseDeleteOption,
    BaseLibraryDeleteModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BaseRecommendationDeleteModal
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isTransparent: {
      type: Boolean,
      default: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isLinkToLibrary: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isRecommendation: Boolean,
    isWithPageOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'activeChange',
    'linkClick',
    'deleted'
  ],
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.isWithPageOption ||
          this.isRenderLibraryOption ||
          this.isRenderFavoriteOption ||
          this.isRenderBookmarkOption ||
          this.isRenderListenedOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isRenderDeleteOption
      )
    },
    isRenderLibraryOption () {
      return (
        this.profileId &&
          this.isWithLibraryOption
      )
    },
    isRenderFavoriteOption () {
      return (
        this.profileId &&
          this.isWithFavoriteOption
      )
    },
    isRenderBookmarkOption () {
      return (
        this.profileId &&
          this.isWithBookmarkOption
      )
    },
    isRenderListenedOption () {
      return (
        this.profileId &&
          this.isWithListenedOption
      )
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatArtistShareData(
        this.artistData
      )
    },
    isRenderDeleteOption () {
      return (
        this.profileId &&
          this.isWithDeleteOption
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
      this.showDeleteModal()
    },
    handleActiveChange (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
