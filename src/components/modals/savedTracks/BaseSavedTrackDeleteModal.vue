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
    handleDeleteButtonClick () {
      this.isLoading = true

      this.deleteAudioFile()
        .then(
          this.handleDeleteAudioFile
        )
    },
    handleDeleteAudioFile () {
      this.deleteAudioFromSettings()
        .then(
          this.handleDeleteAudioFromSettings
        )
    },
    handleDeleteAudioFromSettings () {
      this.isLoading = false

      this.$emit(
        'success'
      )

      this.hide()
    },
    deleteAudioFile () {
      return window
        .mainProcess
        .sendAsyncCommand(
          'delete-audio-file',
          {
            fileName: this.uuid
          }
        )
    },
    deleteAudioFromSettings () {
      return window
        .mainProcess
        .sendAsyncCommand(
          'delete-settings-key-value',
          {
            key: 'profile.savedTracks',
            valueId: this.uuid
          }
        )
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
