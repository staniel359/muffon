<template>
  <BaseDeleteModal
    ref="modal"
    modelType="playlist"
    :modelName="playlistTitle"
    :isLoading="isLoading"
    :error="error"
    isWithAlsoText
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteProfilePlaylist
  from '*/helpers/actions/api/profile/playlist/delete'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'
import { setToast } from '*/helpers/actions/plugins/semantic'

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
    isDeleteWithRedirect: Boolean
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
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
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
  methods: {
    handleDeleteButtonClick () {
      this.deleteProfilePlaylist(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      if (this.isDeleteWithRedirect) {
        this.redirect()
        this.notify()
      } else {
        this.$emit('deleted')
      }
    },
    deleteProfilePlaylist,
    redirect () {
      this.$router.push(
        this.profilePlaylistsLink
      )
    },
    notify () {
      setToast({
        message: this.deletedMessage,
        icon: 'green check'
      })
    },
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  @extend .no-margin
  margin-top: 1em !important
</style>
