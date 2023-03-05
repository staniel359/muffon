<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BookmarkOption
      v-if="isWithBookmarkOption"
      :bookmark-id="bookmarkId"
      :playlist-data="playlistData"
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
        model="videoPlaylist"
        :model-data="playlistData"
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
  from './BaseVideoPlaylistOptionsDropdown/BookmarkOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BaseBookmarkDeleteModal
  from '@/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import {
  videoPlaylist as formatVideoPlaylistShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoPlaylistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BookmarkOption,
    BaseShareOption,
    BaseDeleteOption,
    BaseBookmarkDeleteModal
  },
  props: {
    playlistData: Object,
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
      return formatVideoPlaylistShareData(
        this.playlistData
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
