<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
      <ConnectSection
        @userDataChange="handleUserDataChange"
      />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :userData="userData"
      />
      <SaveSection
        v-if="isSave"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import ConnectSection from './AccountImportModal/ConnectSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ImportSection from './AccountImportModal/ImportSection.vue'
import SaveSection from './AccountImportModal/SaveSection.vue'

export default {
  name: 'AccountImportModal',
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
    handleUserDataChange (value) {
      this.userData = value
    },
    setStatus (value) {
      this.status = value
    },
    setTracks (value) {
      this.tracks = value
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
