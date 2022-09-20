<template>
  <BaseModalContainer
    ref="modal"
  >
    <div class="content main-modal-content-full-height">
      <FolderSelectSection />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :files="files"
      />
      <BaseLibrarySaveSection
        v-else-if="isSave"
        scope="tracks"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import FolderSelectSection
  from './BaseLibraryFolderImportModal/FolderSelectSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ImportSection
  from './BaseLibraryFolderImportModal/ImportSection.vue'
import BaseLibrarySaveSection
  from '@/components/save/library/BaseLibrarySaveSection.vue'

export default {
  name: 'BaseLibraryFolderImportModal',
  components: {
    BaseModalContainer,
    FolderSelectSection,
    BaseDivider,
    ImportSection,
    BaseLibrarySaveSection
  },
  provide () {
    return {
      import: this.import,
      save: this.save,
      retry: this.retry,
      reset: this.reset,
      hideModal: this.hide
    }
  },
  data () {
    return {
      status: null,
      files: [],
      tracks: []
    }
  },
  computed: {
    isImport () {
      return (
        this.status === 'import'
      )
    },
    isSave () {
      return (
        this.status === 'save'
      )
    }
  },
  methods: {
    import (
      value
    ) {
      this.status = 'import'

      this.files = [
        ...value
      ]
    },
    save (
      value
    ) {
      this.status = 'save'

      this.tracks = [
        ...value
      ]
    },
    retry (
      value
    ) {
      this.tracks = [
        ...value
      ]
    },
    reset () {
      this.status = null

      this.files = []
      this.tracks = []
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
