<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <BookmarkOption
        v-if="isRenderBookmarkOption"
        :bookmark-id="bookmarkId"
        :channel-data="channelData"
      />

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="videoChannel"
        :model-data="channelData"
      />

      <template
        v-if="isRenderDeleteOption"
      >
        <BaseDeleteOption
          @click="handleDeleteOptionClick"
        />

        <BaseBookmarkDeleteModal
          v-if="isBookmark"
          ref="deleteModal"
          model="videoChannel"
          :model-data="channelData"
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
import BookmarkOption
  from './BaseVideoChannelOptionsPopup/BookmarkOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import {
  videoChannel as formatVideoChannelShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoChannelOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BookmarkOption,
    BaseShareOption,
    BaseExternalLinkOption,
    BaseDeleteOption,
    BaseBookmarkDeleteModal
  },
  props: {
    channelData: Object,
    bookmarkId: String,
    isBookmark: Boolean,
    isWithBookmarkOption: Boolean,
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
        this.isRenderBookmarkOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isRenderDeleteOption
      )
    },
    isRenderBookmarkOption () {
      return (
        this.profileId &&
          this.isWithBookmarkOption
      )
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoChannelShareData(
        this.channelData
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
