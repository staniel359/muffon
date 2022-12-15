<template>
  <BaseDeleteModal
    ref="modal"
    model-type="savedTrack"
    :model-name="trackFullTitle"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'
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
    },
    tracks () {
      return electronStore.get(
        'profile.savedTracks'
      )
    }
  },
  methods: {
    handleDeleteButtonClick () {
      const tracks = [
        ...this.tracks.filter(
          this.isMatchedTrack
        )
      ]

      electronStore.set(
        {
          'profile.savedTracks': tracks
        }
      )

      ipcRenderer.send(
        'delete-audio',
        {
          fileName: this.uuid
        }
      )

      this.$emit(
        'success'
      )

      this.hide()
    },
    isMatchedTrack (
      trackData
    ) {
      return (
        trackData.uuid !==
          this.uuid
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
