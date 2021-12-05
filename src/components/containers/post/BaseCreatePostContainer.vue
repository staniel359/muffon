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
import fetchPostCreateData from '#/actions/api/profile/post/create/fetchData'

export default {
  name: 'BaseCreatePostContainer',
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
      return this.images.map(
        this.formatImage
      )
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
        const createDataArgs = this.formatPostArgs(
          fields
        )

        this.fetchPostCreateData(
          createDataArgs
        )
      }
    },
    handlePostDataChange () {
      this.$emit(
        'postDataChange'
      )
    },
    fetchPostCreateData,
    formatTrack (trackData) {
      const { title, artist } = trackData

      return { title, artist }
    },
    formatImage (imageData) {
      return imageData.data
    },
    formatPostArgs (fields) {
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
