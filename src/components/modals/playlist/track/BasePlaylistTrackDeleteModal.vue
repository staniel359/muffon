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
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deletePlaylistTrack from '@/helpers/actions/api/playlist/track/delete'

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
    'success'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    playlistTrackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.playlistTrackData.artist.name
    },
    trackTitle () {
      return this.playlistTrackData.title
    },
    playlistTrackId () {
      return this.playlistTrackData.id
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId,
        playlistTrackId:
          this.playlistTrackId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deletePlaylistTrack,
    handleDeleteButtonClick () {
      this.deletePlaylistTrack(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        this.$emit(
          'success'
        )
      }
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
