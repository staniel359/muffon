<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
  >
    <slot></slot>
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/forms/BaseFormContainer.vue'
import { messageFormOptions } from '#/data/plugins/semantic'
import createMessage from '#/actions/api/message/create'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'BaseMessageCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'success'
  ],
  data () {
    return {
      error: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return messageFormOptions({
        onSuccess: this.handleSuccess
      })
    },
    tracksFormatted () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    imagesFormatted () {
      return this.images.map(
        this.formatImage
      )
    }
  },
  methods: {
    handleSuccess (event, fields) {
      event.preventDefault()

      const isContentData = (
        fields.content ||
          this.tracks.length ||
          this.images.length
      )

      if (isContentData) {
        const createArgs =
          this.formatCreateArgs(
            fields
          )

        this.createMessage(
          createArgs
        ).then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess (response) {
      this.$emit(
        'success',
        response.data.conversation_id
      )
    },
    createMessage,
    formatTrack (trackData) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      const artistData = {
        name: artistName
      }

      return {
        title: trackData.title,
        artist: artistData
      }
    },
    formatImage (imageData) {
      return imageData.data
    },
    formatCreateArgs (fields) {
      return {
        otherProfileId: this.profileId,
        content: fields.content,
        tracks: this.tracksFormatted,
        images: this.imagesFormatted
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
