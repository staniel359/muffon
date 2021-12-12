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
import BaseButton from '@/buttons/BaseButton.vue'
import BaseProfileLibraryFolderImportModal
  from '@/modals/profile/library/BaseProfileLibraryFolderImportModal.vue'

export default {
  name: 'FolderImportBlock',
  components: {
    BaseButton,
    BaseProfileLibraryFolderImportModal
  },
  computed: {
    folderText () {
      return this.$t(
        'buttons.from.folder'
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
