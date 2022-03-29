<template>
  <BaseButton
    class="primary import-button"
    icon="folder"
    :text="folderText"
    @click="handleClick"
  />

  <BaseProfileLibraryFolderImportModal ref="modal" />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseProfileLibraryFolderImportModal
  from '*/components/modals/profile/library/BaseProfileLibraryFolderImportModal.vue'

export default {
  name: 'FolderImportBlock',
  components: {
    BaseButton,
    BaseProfileLibraryFolderImportModal
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
