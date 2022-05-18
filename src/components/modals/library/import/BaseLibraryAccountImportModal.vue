<template>
  <BaseModalContainer
    ref="modal"
  >
    <div
      :class="[
        'content',
        'main-modal-content-full-height'
      ]"
    >
      <ConnectSection />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :user-data="userData"
      />
      <BaseLibrarySaveSection
        v-if="isSave"
        scope="tracks"
        :collection="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import ConnectSection from './BaseLibraryAccountImportModal/ConnectSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ImportSection from './BaseLibraryAccountImportModal/ImportSection.vue'
import BaseLibrarySaveSection
  from '*/components/save/library/BaseLibrarySaveSection.vue'

export default {
  name: 'BaseLibraryAccountImportModal',
  components: {
    BaseModalContainer,
    ConnectSection,
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
      userData: null,
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
      if (value) {
        this.status = 'import'

        this.userData = value
      }
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
