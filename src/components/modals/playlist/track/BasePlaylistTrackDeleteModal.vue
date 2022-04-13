<template>
  <BaseDeleteModal
    ref="modal"
    model-type="playlistTrack"
    :model-name="playlistTrackFullTitle"
    :parent-model-name="playlistTitle"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deletePlaylistTrack from '*/helpers/actions/api/playlist/track/delete'

export default {
  name: 'BasePlaylistTrackDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    playlistTrackData: {
      type: Object,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    },
    playlistTitle: {
      type: String,
      required: true
    }
  },
  emits: [
    'deleted'
  ],
  data () {
    return {
      error: null,
      isLoading: false
    }
  },
  computed: {
    playlistTrackFullTitle () {
      return [
        this.playlistTrackData.artist.name,
        this.playlistTrackData.title
      ].join(
        ' - '
      )
    },
    playlistTrackId () {
      return this.playlistTrackData.id
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId,
        playlistTrackId: this.playlistTrackId
      }
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePlaylistTrack(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs
        .modal
        .hide()

      this.$emit(
        'deleted'
      )
    },
    deletePlaylistTrack,
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
