<template>
  <BaseDeleteModal
    ref="modal"
    model-type="playlist"
    :model-name="playlistTitle"
    :is-loading="isLoading"
    :error="error"
    is-with-also-text
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deletePlaylist from '@/helpers/actions/api/playlist/delete'
import {
  playlists as formatProfilePlaylistsLink
} from '@/helpers/formatters/links/profile'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BasePlaylistDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isWithRedirect: Boolean
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
    deletedMessage () {
      return this.$t(
        'notifications.deleted.playlist',
        {
          playlistTitle:
            this.playlistTitleStrong
        }
      )
    },
    playlistTitleStrong () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    playlistTitle () {
      return this.playlistData.title
    },
    profilePlaylistsLink () {
      return formatProfilePlaylistsLink(
        {
          profileId: this.profileId
        }
      )
    },
    profileId () {
      return this.playlistData.profile.id
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId
      }
    },
    playlistId () {
      return this.playlistData.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deletePlaylist,
    handleDeleteButtonClick () {
      this.deletePlaylist(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        if (this.isWithRedirect) {
          this.redirect()

          this.notify()
        } else {
          this.$emit(
            'success'
          )
        }
      }
    },
    redirect () {
      this.$router.push(
        this.profilePlaylistsLink
      )
    },
    notify () {
      setToast(
        {
          message: this.deletedMessage,
          icon: 'green check'
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

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
