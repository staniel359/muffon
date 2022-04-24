<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  messageFormOptions
} from '*/helpers/data/plugins/semantic'
import createMessage from '*/helpers/actions/api/message/create'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

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
      conversationId: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return messageFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
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
  watch: {
    conversationId: 'handleConversationIdChange'
  },
  methods: {
    createMessage,
    handleSuccess (
      event,
      fields
    ) {
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
        )
      }
    },
    handleConversationIdChange (
      value
    ) {
      if (value) {
        this.$emit(
          'success',
          value
        )
      }
    },
    formatTrack (
      trackData
    ) {
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
    formatImage (
      imageData
    ) {
      return imageData.data
    },
    formatCreateArgs (
      fields
    ) {
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
