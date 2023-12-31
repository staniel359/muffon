<template>
  <BaseModalContainer
    ref="modal"
  >
    <template
      #default="slotProps"
    >
      <div
        class="content full-height large-padded"
        :class="[
          slotProps.class
        ]"
      >
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
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import FolderSelectSection
  from './BaseLibraryDriveImportModal/FolderSelectSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ImportSection
  from './BaseLibraryDriveImportModal/ImportSection.vue'
import BaseLibrarySaveSection
  from '@/components/save/library/BaseLibrarySaveSection.vue'

export default {
  name: 'BaseLibraryDriveImportModal',
  components: {
    BaseModalContainer,
    FolderSelectSection,
    BaseDivider,
    ImportSection,
    BaseLibrarySaveSection
  },
  provide () {
    return {
      importData: this.importData,
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
    importData (
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
