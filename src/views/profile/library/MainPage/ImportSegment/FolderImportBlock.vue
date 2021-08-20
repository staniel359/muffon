<template>
  <BaseButton
    class="primary import-button"
    icon="folder"
    :text="addFormatted"
    @click="handleClick"
  />

  <FolderImportModal ref="modal" />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import FolderImportModal from './FolderImportBlock/FolderImportModal.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'FolderImportBlock',
  components: {
    BaseButton,
    FolderImportModal
  },
  computed: {
    addFormatted () {
      return localize(
        'pages.library.add.buttons.folder'
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
