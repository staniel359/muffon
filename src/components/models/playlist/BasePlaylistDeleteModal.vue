<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
      </div>

      <div class="content">
        <TextSection
          :playlistTitle="playlistTitle"
        />

        <BaseError
          v-if="error"
          class="error-message"
          :error="error"
        />
      </div>

      <div class="actions">
        <BaseButton
          class="cancel"
          :text="cancelFormatted"
        />

        <BaseButton
          class="red"
          :text="deleteFormatted"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import TextSection from './BasePlaylistDeleteModal/TextSection.vue'
import BaseError from '@/BaseError.vue'
import BaseButton from '@/BaseButton.vue'
import deleteProfilePlaylistData
  from '#/actions/api/profile/playlists/playlist/deleteData'
import {
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'BasePlaylistDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseError,
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
    }
  },
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'shared.playlist.delete.header'
      )
    },
    cancelFormatted () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteFormatted () {
      return this.$t(
        'buttons.delete'
      )
    },
    toastMessage () {
      return this.$t(
        'shared.playlist.deleted',
        { playlistTitle: this.playlistTitleFormatted }
      )
    },
    playlistTitleFormatted () {
      return `<strong>${this.playlistTitle}</strong>`
    },
    callbackUrl () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteProfilePlaylistData,
    handleDeleteButtonClick () {
      this.deleteProfilePlaylistData({
        playlistId: this.playlistId
      })
    },
    handleIsSuccessChange () {
      this.$refs.modal.hide()

      this.$router.push(
        this.callbackUrl
      )

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
