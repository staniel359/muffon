<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-transparent="isTransparent"
  >
    <FavoriteOption
      v-if="isWithFavoriteOption"
      :favorite-id="favoriteId"
      :video-data="videoData"
    />

    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :video-data="videoData"
    />

    <WatchedOption
      v-if="isWithWatchedOption"
      :watched-id="watchedId"
      :video-data="videoData"
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

      <BaseFavoriteDeleteModal
        v-if="isFavorite"
        ref="deleteModal"
        model="video"
        :model-data="videoData"
        @success="handleDeleted"
      />
      <BaseBookmarkDeleteModal
        v-else-if="isBookmark"
        ref="deleteModal"
        model="video"
        :model-data="videoData"
        @success="handleDeleted"
      />
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
import FavoriteOption from './BaseVideoOptionsPopup/FavoriteOption.vue'
import BookmarkOption from './BaseVideoOptionsPopup/BookmarkOption.vue'
import WatchedOption from './BaseVideoOptionsPopup/WatchedOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import {
  video as formatVideoShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoOptionsPopup',
  components: {
    FavoriteOption,
    BookmarkOption,
    WatchedOption,
    BaseOptionsPopupContainer,
    BaseShareOption,
    BaseDeleteOption,
    BaseFavoriteDeleteModal,
    BaseBookmarkDeleteModal
  },
  props: {
    isTransparent: {
      type: Boolean,
      default: true
    },
    videoData: Object,
    favoriteId: String,
    bookmarkId: String,
    watchedId: String,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
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
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithFavoriteOption ||
          this.isWithBookmarkOption ||
          this.isWithWatchedOption ||
          this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
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
