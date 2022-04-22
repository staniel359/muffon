<template>
  <BaseModalContainer ref="modal">
    <div
      :class="[
        'content',
        'main-modal-content-full-height'
      ]"
    >
      <FolderSelectSection />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :files="files"
      />
      <SaveSection
        v-else-if="isSave"
        :files="files"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import FolderSelectSection
  from './BaseProfileLibraryFolderImportModal/FolderSelectSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ImportSection
  from './BaseProfileLibraryFolderImportModal/ImportSection.vue'
import SaveSection from './BaseProfileLibraryFolderImportModal/SaveSection.vue'

export default {
  name: 'BaseProfileLibraryFolderImportModal',
  components: {
    BaseModalContainer,
    FolderSelectSection,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      setStatus: this.setStatus,
      setFiles: this.setFiles,
      hideModal: this.hide
    }
  },
  data () {
    return {
      status: null,
      files: []
    }
  },
  computed: {
    isImport () {
      return (
        this.status === 'import' &&
          this.files.length
      )
    },
    isSave () {
      return (
        this.status === 'save' &&
          this.files.length
      )
    }
  },
  methods: {
    setStatus (
      value
    ) {
      this.status = value
    },
    setFiles (
      value
    ) {
      this.files = value
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
