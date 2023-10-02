<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <template
        v-if="isRenderAddOption"
      >
        <BaseAddOption
          v-if="slotProps.isVisible"
          :playlist-id="playlistId"
          is-with-search-option
          is-with-library-option
          @search-option-click="handleSearchAddOptionClick"
          @library-option-click="handleLibraryAddOptionClick"
        />

        <BasePlaylistSearchImportModal
          ref="searchModal"
          :playlist-id="playlistId"
        />

        <BasePlaylistLibraryImportModal
          ref="libraryModal"
          :playlist-id="playlistId"
        />
      </template>

      <BaseShareOption
        v-if="isRenderShareOption"
        :share-data="shareData"
      />

      <BaseExternalLinkOption
        v-if="isWithExternalLinkOption && slotProps.isVisible"
        model="playlist"
        :model-data="playlistData"
      />

      <template
        v-if="isRenderEditOption"
      >
        <BaseEditOption
          @click="handleEditOptionClick"
        />

        <BasePlaylistUpdateModal
          ref="editModal"
          :playlist-data="playlistData"
        />
      </template>

      <template
        v-if="isRenderDeleteOption"
      >
        <BaseDeleteOption
          @click="handleDeleteOptionClick"
        />

        <BasePlaylistDeleteModal
          ref="deleteModal"
          :playlist-data="playlistData"
          :is-with-redirect="isDeleteWithRedirect"
          @success="handleDeleted"
        />
      </template>
    </template>
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseAddOption from '@/components/popups/options/BaseAddOption.vue'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseExternalLinkOption
  from '@/components/popups/options/BaseExternalLinkOption.vue'
import BaseEditOption
  from '@/components/popups/options/BaseEditOption.vue'
import BasePlaylistUpdateModal
  from '@/components/modals/playlist/BasePlaylistUpdateModal.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BasePlaylistDeleteModal
  from '@/components/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  playlist as formatPlaylistShareData
} from '@/helpers/formatters/share'

const BasePlaylistSearchImportModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/playlist/import/BasePlaylistSearchImportModal.vue'
    )
  )
const BasePlaylistLibraryImportModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/playlist/import/BasePlaylistLibraryImportModal.vue'
    )
  )

export default {
  name: 'BasePlaylistOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BaseAddOption,
    BasePlaylistSearchImportModal,
    BasePlaylistLibraryImportModal,
    BaseShareOption,
    BaseExternalLinkOption,
    BaseEditOption,
    BasePlaylistUpdateModal,
    BaseDeleteOption,
    BasePlaylistDeleteModal
  },
  props: {
    playlistData: Object,
    isWithAddOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
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
        this.isRenderAddOption ||
          this.isRenderShareOption ||
          this.isWithExternalLinkOption ||
          this.isRenderEditOption ||
          this.isRenderDeleteOption
      )
    },
    isRenderAddOption () {
      return (
        this.profileId &&
          this.isWithAddOption
      )
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatPlaylistShareData(
        this.playlistData
      )
    },
    isRenderEditOption () {
      return (
        this.profileId &&
          this.isWithEditOption
      )
    },
    isRenderDeleteOption () {
      return (
        this.profileId &&
          this.isWithDeleteOption
      )
    },
    playlistId () {
      return this.playlistData.id.toString()
    }
  },
  methods: {
    handleSearchAddOptionClick () {
      this.showSearchAddModal()
    },
    handleLibraryAddOptionClick () {
      this.showLibraryAddModal()
    },
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    showSearchAddModal () {
      this.$refs
        .searchModal
        .show()
    },
    showLibraryAddModal () {
      this.$refs
        .libraryModal
        .show()
    },
    showEditModal () {
      this.$refs
        .editModal
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
