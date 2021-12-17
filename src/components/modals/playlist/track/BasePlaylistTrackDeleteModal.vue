<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
      </div>

      <div class="content">
        <TextSection
          :playlistTrackFullTitle="playlistTrackFullTitle"
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
import TextSection from './BasePlaylistTrackDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deletePlaylistTrack from '#/actions/api/playlist/track/delete'

export default {
  name: 'BasePlaylistTrackDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
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
    headerText () {
      return this.$t(
        'shared.favorite.delete.header'
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
    playlistTrackFullTitle () {
      return [
        this.playlistTrackData.artist.name,
        this.playlistTrackData.title
      ].join(' - ')
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
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deletePlaylistTrack,
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
