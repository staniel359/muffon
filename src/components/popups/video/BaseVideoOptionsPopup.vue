<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-transparent="isTransparent"
  >
    <template
      #default="slotProps"
    >
      <FavoriteOption
        v-if="isRenderFavoriteOption"
        :favorite-id="favoriteId"
        :video-data="videoData"
      />

      <BookmarkOption
        v-if="isRenderBookmarkOption"
        :bookmark-id="bookmarkId"
        :video-data="videoData"
      />

      <WatchedOption
        v-if="isRenderWatchedOption"
        :watched-id="watchedId"
        :video-data="videoData"
      />

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="video"
        :model-data="videoData"
      />

      <template
        v-if="isRenderDeleteOption"
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
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
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
    BaseExternalLinkOption,
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
    favoriteId: Number,
    bookmarkId: Number,
    watchedId: Number,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
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
        this.isRenderFavoriteOption ||
          this.isRenderBookmarkOption ||
          this.isRenderWatchedOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isRenderDeleteOption
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
    isRenderWatchedOption () {
      return (
        this.profileId &&
          this.isWithWatchedOption
      )
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
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
