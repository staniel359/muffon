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

export default {
  name: 'FolderImportBlock',
  components: {
    BaseButton,
    FolderImportModal
  },
  computed: {
    addFormatted () {
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
