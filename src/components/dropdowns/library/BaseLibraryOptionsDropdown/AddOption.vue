<template>
  <BaseOption
    icon="plus"
    :text="addText"
    :options="options"
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

<script>
import {
  mapState
} from 'vuex'
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'
import BaseLibrarySearchImportModal
  from '@/components/modals/library/import/BaseLibrarySearchImportModal.vue'
import BaseLibraryAccountImportModal
  from '@/components/modals/library/import/BaseLibraryAccountImportModal.vue'
import BaseLibraryFolderImportModal
  from '@/components/modals/library/import/BaseLibraryFolderImportModal.vue'

export default {
  name: 'AddOption',
  components: {
    BaseOption,
    BaseLibrarySearchImportModal,
    BaseLibraryAccountImportModal,
    BaseLibraryFolderImportModal
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    addText () {
      return this.$t(
        'actions.add'
      )
    },
    options () {
      return [
        {
          icon: 'search',
          text: this.$t(
            'actions.from.search'
          ),
          onClick: this.showSearchModal
        },
        {
          icon: 'user circle',
          text: this.$t(
            'actions.from.account'
          ),
          isDisabled:
            !this.isAccountConnected,
          onClick: this.showAccountModal
        },
        {
          icon: 'folder',
          text: this.$t(
            'actions.from.folder'
          ),
          onClick: this.showFolderModal
        }
      ]
    },
    isAccountConnected () {
      return !!this.lastfmNickname
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
    }
  },
  methods: {
    showSearchModal () {
      this.$refs
        .searchModal
        .show()
    },
    showAccountModal () {
      this.$refs
        .accountModal
        .show()
    },
    showFolderModal () {
      this.$refs
        .folderModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
