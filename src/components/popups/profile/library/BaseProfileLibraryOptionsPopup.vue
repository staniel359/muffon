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
          :is-account-connected="isAccountConnected"
          @search-option-click="handleAddSearchOptionClick"
          @account-option-click="handleAddAccountOptionClick"
          @folder-option-click="handleAddFolderOptionClick"
        />

        <BaseLibrarySearchImportModal
          ref="searchModal"
        />

        <BaseLibraryAccountImportModal
          v-if="isAccountConnected"
          ref="accountModal"
        />

        <BaseLibraryFolderImportModal
          ref="folderModal"
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
import AddOption from './BaseProfileLibraryOptionsPopup/AddOption.vue'
import BaseLibrarySearchImportModal
  from '@/components/modals/library/import/BaseLibrarySearchImportModal.vue'
import BaseLibraryAccountImportModal
  from '@/components/modals/library/import/BaseLibraryAccountImportModal.vue'
import BaseLibraryFolderImportModal
  from '@/components/modals/library/import/BaseLibraryFolderImportModal.vue'

export default {
  name: 'BaseProfileLibraryOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    AddOption,
    BaseLibrarySearchImportModal,
    BaseLibraryAccountImportModal,
    BaseLibraryFolderImportModal
  },
  props: {
    isWithAddOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        profileInfo: 'info'
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
        this.isWithAddOption
      )
    },
    isAccountConnected () {
      return !!this.lastfmNickname
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
    }
  },
  methods: {
    handleAddSearchOptionClick () {
      this.showAddSearchModal()
    },
    handleAddAccountOptionClick () {
      this.showAddAccountModal()
    },
    handleAddFolderOptionClick () {
      this.showAddFolderModal()
    },
    showAddSearchModal () {
      this.$refs
        .searchModal
        .show()
    },
    showAddAccountModal () {
      this.$refs
        .accountModal
        .show()
    },
    showAddFolderModal () {
      this.$refs
        .folderModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
