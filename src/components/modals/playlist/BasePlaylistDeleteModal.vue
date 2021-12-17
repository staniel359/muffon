<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
      </div>

      <div class="content">
        <TextSection
          :playlistTitle="playlistTitle"
        />

        <BaseErrorMessage
          v-if="error"
          class="error-message"
          :error="error"
        />
      </div>

      <div class="actions">
        <BaseButton
          class="cancel"
          :text="cancelText"
        />

        <BaseButton
          class="red"
          :text="deleteText"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import TextSection from './BasePlaylistDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deletePlaylist from '#/actions/api/playlist/delete'
import {
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'BasePlaylistDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    },
    playlistTitle: {
      type: String,
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
    headerText () {
      return this.$t(
        'shared.playlist.delete.header'
      )
    },
    cancelText () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteText () {
      return this.$t(
        'buttons.delete'
      )
    },
    toastMessage () {
      return this.$t(
        'shared.playlist.deleted',
        { playlistTitle: this.playlistTitleStrong }
      )
    },
    playlistTitleStrong () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    profilePlaylistsLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId
      }
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePlaylist(
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
    deletePlaylist,
    redirect () {
      this.$router.push(
        this.profilePlaylistsLink
      )
    },
    notify () {
      setToast({
        message: this.toastMessage,
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
