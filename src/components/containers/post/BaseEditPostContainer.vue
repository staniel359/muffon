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
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import { postFormOptions } from '#/data/plugins/semantic'
import fetchPostEditData from '#/actions/api/profile/post/edit/fetchData'

export default {
  name: 'BaseEditPostContainer',
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
        const editDataArgs = this.formatPostArgs(
          fields
        )

        this.fetchPostEditData(
          editDataArgs
        )
      }
    },
    handlePostDataChange (value) {
      this.$emit(
        'postDataChange',
        value
      )
    },
    fetchPostEditData,
    formatTrack (trackData) {
      const { title, artist } = trackData

      return { title, artist }
    },
    formatImage (imageData) {
      return imageData.data
    },
    formatPostArgs (fields) {
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
