<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :channel-data="channelData"
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

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="videoChannel"
        :model-data="channelData"
        @success="handleDeleted"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BookmarkOption
  from './BaseVideoChannelOptionsDropdown/BookmarkOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import {
  videoChannel as formatVideoChannelShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoChannelOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BookmarkOption,
    BaseShareOption,
    BaseDeleteOption,
    BaseBookmarkDeleteModal
  },
  props: {
    channelData: Object,
    bookmarkId: String,
    isBookmark: Boolean,
    isWithBookmarkOption: Boolean,
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
        this.isWithBookmarkOption ||
          this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoChannelShareData(
        this.channelData
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
