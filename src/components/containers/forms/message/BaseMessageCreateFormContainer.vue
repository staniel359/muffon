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
  from '@/components/containers/forms/BaseFormContainer.vue'
import {
  messageFormOptions
} from '@/helpers/formatters/plugins/semantic'
import createMessage from '@/helpers/actions/api/message/create'
import {
  decryptTextWithLinks
} from '@/helpers/utils'

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
    images: {
      type: Array,
      default () {
        return []
      }
    },
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    albums: {
      type: Array,
      default () {
        return []
      }
    },
    tracks: {
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
          this.images.length ||
          this.artists.length ||
          this.albums.length ||
          this.tracks.length
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
    formatImage (
      imageData
    ) {
      return imageData.data
    },
    formatCreateArgs (
      fields
    ) {
      const text =
        decryptTextWithLinks(
          fields.content
        )

      return {
        otherProfileId: this.profileId,
        text,
        images: this.imagesFormatted,
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
