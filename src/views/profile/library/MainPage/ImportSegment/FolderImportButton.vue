<template>
  <BaseButton
    class="basic circular import-button"
    icon="folder"
    :text="folderText"
    @click="handleClick"
  />

  <BaseLibraryFolderImportModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseLibraryFolderImportModal
  from '*/components/modals/library/import/BaseLibraryFolderImportModal.vue'

export default {
  name: 'FolderImportButton',
  components: {
    BaseButton,
    BaseLibraryFolderImportModal
  },
  computed: {
    folderText () {
      return this.$t(
        'actions.from.folder'
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
