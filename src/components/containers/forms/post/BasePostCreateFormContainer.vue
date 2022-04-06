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
import createPost from '*/helpers/actions/api/post/create'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'BasePostCreateFormContainer',
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

        this.createPost(
          createArgs
        ).then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess () {
      this.$emit(
        'success'
      )
    },
    createPost,
    formatTrack (trackData) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      return {
        title: trackData.title,
        artist: {
          name: artistName
        }
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
