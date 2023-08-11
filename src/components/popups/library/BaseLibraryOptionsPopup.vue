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
          is-with-search-option
          @search-option-click="handleSearchAddOptionClick"
        />

        <BaseLibrarySearchImportModal
          ref="searchModal"
        />
      </template>

      <template
        v-if="isRenderImportOption"
      >
        <BaseImportOption
          v-if="slotProps.isVisible"
          :is-connections="isConnections"
          is-with-account-option
          is-with-drive-option
          @account-option-click="handleAccountImportOptionClick"
          @drive-option-click="handleDriveImportOptionClick"
        />

        <BaseLibraryAccountImportModal
          v-if="isConnections"
          ref="accountModal"
        />

        <BaseLibraryDriveImportModal
          ref="driveModal"
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
import BaseAddOption from '@/components/popups/options/BaseAddOption.vue'
import BaseLibrarySearchImportModal
  from '@/components/modals/library/import/BaseLibrarySearchImportModal.vue'
import BaseImportOption from '@/components/popups/options/BaseImportOption.vue'
import BaseLibraryAccountImportModal
  from '@/components/modals/library/import/BaseLibraryAccountImportModal.vue'
import BaseLibraryDriveImportModal
  from '@/components/modals/library/import/BaseLibraryDriveImportModal.vue'

export default {
  name: 'BaseLibraryOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BaseAddOption,
    BaseLibrarySearchImportModal,
    BaseImportOption,
    BaseLibraryAccountImportModal,
    BaseLibraryDriveImportModal
  },
  props: {
    isWithAddOption: Boolean,
    isWithImportOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        profileConnections: 'connections'
      }
    ),
    isRender () {
      return (
        this.isRenderAddOption ||
          this.isRenderImportOption
      )
    },
    isRenderAddOption () {
      return (
        this.profileId &&
          this.isWithAddOption
      )
    },
    isRenderImportOption () {
      return (
        this.profileId &&
          this.isWithImportOption
      )
    },
    isConnections () {
      return !!(
        this.lastfmConnection ||
          this.spotifyConnection
      )
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    spotifyConnection () {
      return this.profileConnections.spotify
    }
  },
  methods: {
    handleSearchAddOptionClick () {
      this.showSearchAddModal()
    },
    handleAccountImportOptionClick () {
      this.showAccountImportModal()
    },
    handleDriveImportOptionClick () {
      this.showDriveImportModal()
    },
    showSearchAddModal () {
      this.$refs
        .searchModal
        .show()
    },
    showAccountImportModal () {
      this.$refs
        .accountModal
        .show()
    },
    showDriveImportModal () {
      this.$refs
        .driveModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
