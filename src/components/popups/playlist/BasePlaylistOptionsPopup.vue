<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <template
        v-if="isWithAddOption"
      >
        <AddOption
          v-if="slotProps.isVisible"
          :playlist-id="playlistId"
          @search-option-click="handleAddSearchOptionClick"
          @library-option-click="handleAddLibraryOptionClick"
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
        v-if="isWithShareOption"
        :share-data="shareData"
      />

      <template
        v-if="isWithEditOption"
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
        v-if="isWithDeleteOption"
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
import AddOption from './BasePlaylistOptionsPopup/AddOption.vue'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
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
    AddOption,
    BasePlaylistSearchImportModal,
    BasePlaylistLibraryImportModal,
    BaseShareOption,
    BaseEditOption,
    BasePlaylistUpdateModal,
    BaseDeleteOption,
    BasePlaylistDeleteModal
  },
  props: {
    playlistData: Object,
    isWithAddOption: Boolean,
    isWithShareOption: Boolean,
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
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithAddOption ||
          this.isWithShareOption ||
          this.isWithEditOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatPlaylistShareData(
        this.playlistData
      )
    },
    playlistId () {
      return this.playlistData.id.toString()
    }
  },
  methods: {
    handleAddSearchOptionClick () {
      this.showAddSearchModal()
    },
    handleAddLibraryOptionClick () {
      this.showAddLibraryModal()
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
    showAddSearchModal () {
      this.$refs
        .searchModal
        .show()
    },
    showAddLibraryModal () {
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
