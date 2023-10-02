<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
    :is-inline="isInline"
    :is-show-to-top="isShowToTop"
  >
    <template
      #default="slotProps"
    >
      <PageOption
        v-if="isWithPageOption"
        :track-data="trackData"
        @click="handleLinkClick"
      />

      <SourceOption
        v-if="isWithSourceOption && slotProps.isVisible"
        @click="handleSourceClick"
      />

      <LibraryOption
        v-if="isRenderLibraryOption"
        :library-id="libraryId"
        :track-data="trackData"
        @link-click="handleLinkClick"
      />

      <template
        v-if="isRenderPlaylistOption"
      >
        <BasePlaylistOption
          @click="handlePlaylistOptionClick"
        />

        <BasePlaylistsModal
          ref="playlistsModal"
          model="track"
          :model-data="trackData"
          :tracks="playlistTracks"
        />
      </template>

      <FavoriteOption
        v-if="isRenderFavoriteOption"
        :favorite-id="favoriteId"
        :track-data="trackData"
      />

      <BookmarkOption
        v-if="isRenderBookmarkOption"
        :bookmark-id="bookmarkId"
        :track-data="trackData"
      />

      <ListenedOption
        v-if="isRenderListenedOption"
        :listened-id="listenedId"
        :track-data="trackData"
      />

      <QueueOption
        v-if="isWithQueueOption"
        :track-data="trackData"
      />

      <SaveOption
        v-if="isRenderSaveOption"
        :track-data="trackData"
      />

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="track"
        :model-data="trackData"
      />

      <CloseOption
        v-if="isWithCloseOption"
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
          model="track"
          :profile-id="profileId"
          :model-data="trackData"
          :is-with-redirect="isDeleteWithRedirect"
          @success="handleDeleted"
        />
        <BaseBookmarkDeleteModal
          v-else-if="isBookmark"
          ref="deleteModal"
          model="track"
          :model-data="trackData"
          @success="handleDeleted"
        />
        <BaseFavoriteDeleteModal
          v-else-if="isFavorite"
          ref="deleteModal"
          model="track"
          :model-data="trackData"
          @success="handleDeleted"
        />
        <BasePlaylistTrackDeleteModal
          v-else-if="isPlaylistTrack"
          ref="deleteModal"
          :playlist-track-data="trackData"
          :playlist-id="playlistId"
          :playlist-title="playlistTitle"
          @success="handleDeleted"
        />
        <BaseSavedTrackDeleteModal
          v-else-if="isSavedTrack"
          ref="deleteModal"
          :track-data="trackData"
          @success="handleDeleted"
        />
        <BaseRecommendationDeleteModal
          v-else-if="isRecommendation"
          ref="deleteModal"
          model="track"
          :model-data="trackData"
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
import PageOption from './BaseTrackOptionsPopup/PageOption.vue'
import SourceOption from './BaseTrackOptionsPopup/SourceOption.vue'
import LibraryOption from './BaseTrackOptionsPopup/LibraryOption.vue'
import BasePlaylistOption
  from '@/components/popups/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import FavoriteOption from './BaseTrackOptionsPopup/FavoriteOption.vue'
import BookmarkOption from './BaseTrackOptionsPopup/BookmarkOption.vue'
import ListenedOption from './BaseTrackOptionsPopup/ListenedOption.vue'
import QueueOption from './BaseTrackOptionsPopup/QueueOption.vue'
import SaveOption from './BaseTrackOptionsPopup/SaveOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
import CloseOption from './BaseTrackOptionsPopup/CloseOption.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import BasePlaylistTrackDeleteModal
  from '@/components/modals/playlist/track/BasePlaylistTrackDeleteModal.vue'
import BaseSavedTrackDeleteModal
  from '@/components/modals/savedTracks/BaseSavedTrackDeleteModal.vue'
import BaseRecommendationDeleteModal
  from '@/components/modals/recommendation/BaseRecommendationDeleteModal.vue'
import {
  track as formatTrackShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseTrackOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    PageOption,
    SourceOption,
    LibraryOption,
    BasePlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    QueueOption,
    SaveOption,
    BaseShareOption,
    BaseExternalLinkOption,
    CloseOption,
    BaseDeleteOption,
    BasePlaylistsModal,
    BaseLibraryDeleteModal,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal,
    BasePlaylistTrackDeleteModal,
    BaseSavedTrackDeleteModal,
    BaseRecommendationDeleteModal
  },
  props: {
    trackData: {
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
    isPlaylistTrack: Boolean,
    isRecommendation: Boolean,
    playlistId: String,
    playlistTitle: String,
    isWithPageOption: Boolean,
    isWithSourceOption: Boolean,
    isWithLibraryOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithQueueOption: Boolean,
    isWithSaveOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithCloseOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean,
    isClearable: Boolean,
    isInline: Boolean,
    isShowToTop: Boolean
  },
  emits: [
    'linkClick',
    'sourceClick',
    'deleteOptionClick',
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
          this.isWithSourceOption ||
          this.isRenderLibraryOption ||
          this.isRenderPlaylistOption ||
          this.isRenderFavoriteOption ||
          this.isRenderBookmarkOption ||
          this.isRenderListenedOption ||
          this.isWithQueueOption ||
          this.isRenderSaveOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isWithCloseOption ||
          this.isWithDeleteOption
      )
    },
    isRenderLibraryOption () {
      return (
        this.profileId &&
          this.isWithLibraryOption
      )
    },
    isRenderPlaylistOption () {
      return (
        this.profileId &&
          this.isWithPlaylistOption
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
    isRenderSaveOption () {
      return (
        this.isWithSaveOption &&
          this.isAudioPresent &&
          !this.isSavedTrack
      )
    },
    isAudioPresent () {
      return !!this.trackData.audio?.present
    },
    isSavedTrack () {
      return !!this.trackData.audio?.local
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatTrackShareData(
        this.trackData
      )
    },
    playlistTracks () {
      return [
        this.trackData
      ]
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteOptionClick'
        )
      } else {
        this.showDeleteModal()
      }
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    handleSourceClick (
      value
    ) {
      this.$emit(
        'sourceClick',
        value
      )
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
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
