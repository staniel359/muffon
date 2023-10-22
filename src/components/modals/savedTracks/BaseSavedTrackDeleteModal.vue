<template>
  <BaseDeleteModal
    ref="modal"
    model-type="savedTrack"
    :model-name="trackFullTitle"
    :is-loading="isLoading"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'

export default {
  name: 'BaseSavedTrackDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'success'
  ],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    uuid () {
      return this.trackData.uuid
    }
  },
  methods: {
    async handleDeleteButtonClick () {
      this.isLoading = true

      const deleteData = {
        fileName: this.uuid
      }

      const deleteDataFormatted =
        JSON.stringify(
          deleteData
        )

      await ipcRenderer.invoke(
        'delete-audio',
        deleteDataFormatted
      )

      await ipcRenderer.invoke(
        'delete-electron-store-value',
        'profile.savedTracks',
        this.uuid
      )

      this.isLoading = false

      this.$emit(
        'success'
      )

      this.hide()
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
