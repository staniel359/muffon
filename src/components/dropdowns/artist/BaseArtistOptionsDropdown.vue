<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
    @active-change="handleActiveChange"
  >
    <LibraryOption
      v-if="isWithLibraryOption"
      :library-id="libraryId"
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />

    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :artist-data="artistData"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :artist-data="artistData"
    />

    <ListenedOption
      v-if="isWithListenedOption"
      :listened-id="listenedId"
      :artist-data="artistData"
    />

    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />

    <template
      v-if="isWithDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BaseLibraryDeleteModal
        v-if="isLinkToLibrary"
        ref="deleteModal"
        model="artist"
        :profile-id="profileId"
        :model-id="libraryArtistId"
        :model-name="artistName"
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
        :recommendation-data="artistData"
        @success="handleDeleted"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import LibraryOption from './BaseArtistOptionsDropdown/LibraryOption.vue'
import FavoriteOption from './BaseArtistOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseArtistOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseArtistOptionsDropdown/ListenedOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
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
  name: 'BaseArtistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    LibraryOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    BaseShareOption,
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
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isLinkToLibrary: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isRecommendation: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'activeChange',
    'linkClick',
    'deleted'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithLibraryOption ||
          this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithListenedOption ||
          this.isWithShareOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatArtistShareData(
        this.artistData
      )
    },
    libraryArtistId () {
      return this.artistData.library.id.toString()
    },
    artistName () {
      return this.artistData.name
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
