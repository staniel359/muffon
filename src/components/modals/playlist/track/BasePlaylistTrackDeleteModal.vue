<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
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
import TextSection from './BasePlaylistTrackDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deletePlaylistTrackData
  from '#/actions/api/profile/playlist/track/deleteData'

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
    headerFormatted () {
      return this.$t(
        'shared.favorite.delete.header'
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
    playlistTrackFullTitle () {
      return [
        this.playlistTrackData.artist.name,
        this.playlistTrackData.title
      ].join(' - ')
    },
    playlistTrackId () {
      return this.playlistTrackData.id
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePlaylistTrackData({
        playlistId: this.playlistId,
        playlistTrackId: this.playlistTrackId
      })
    },
    deletePlaylistTrackData,
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
