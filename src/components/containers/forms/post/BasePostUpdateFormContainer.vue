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
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import { postFormOptions } from '*/helpers/data/plugins/semantic'
import updatePost from '*/helpers/actions/api/post/update'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'BasePostUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    postId: {
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
    'postDataChange'
  ],
  data () {
    return {
      postData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return postFormOptions({
        onSuccess: this.handleSuccess
      })
    },
    tracksFormatted () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    imagesFormatted () {
      if (this.images.length) {
        return this.images.map(
          this.formatImage
        )
      } else {
        return 'DELETED'
      }
    }
  },
  watch: {
    postData: 'handlePostDataChange'
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
        const updateArgs =
          this.formatUpdateArgs(
            fields
          )

        this.updatePost(
          updateArgs
        )
      }
    },
    handlePostDataChange (value) {
      this.$emit(
        'postDataChange',
        value
      )
    },
    updatePost,
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
    formatUpdateArgs (fields) {
      return {
        postId: this.postId,
        content: fields.content,
        tracks: this.tracksFormatted,
        images: this.imagesFormatted
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
