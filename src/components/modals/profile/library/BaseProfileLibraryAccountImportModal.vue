<template>
  <BaseModalContainer ref="modal">
    <div
      :class="[
        'content',
        'main-modal-content-full-height'
      ]"
    >
      <ConnectSection
        @user-data-change="handleUserDataChange"
      />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :user-data="userData"
      />
      <SaveSection
        v-if="isSave"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import ConnectSection
  from './BaseProfileLibraryAccountImportModal/ConnectSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import ImportSection
  from './BaseProfileLibraryAccountImportModal/ImportSection.vue'
import SaveSection
  from './BaseProfileLibraryAccountImportModal/SaveSection.vue'

export default {
  name: 'BaseProfileLibraryAccountImportModal',
  components: {
    BaseModalContainer,
    ConnectSection,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      setStatus: this.setStatus,
      setTracks: this.setTracks,
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
        this.status === 'import' &&
          !!this.userData
      )
    },
    isSave () {
      return (
        this.status === 'save' &&
          this.tracks.length
      )
    }
  },
  methods: {
    handleUserDataChange (
      value
    ) {
      this.userData = value
    },
    setStatus (
      value
    ) {
      this.status = value
    },
    setTracks (
      value
    ) {
      this.tracks = value
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
