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
  postComment as postCommentFormOptions
} from '@/helpers/formatters/plugins/semantic/options/form'
import createProfilePostComment
  from '@/helpers/actions/api/profile/post/comment/create'
import createCommunityPostComment
  from '@/helpers/actions/api/community/post/comment/create'
import {
  decryptTextWithLinks
} from '@/helpers/utils'

export default {
  name: 'BasePostCommentCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    model: {
      type: String,
      required: true
    },
    postId: {
      type: Number,
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
    },
    profileId: Number,
    communityId: Number
  },
  emits: [
    'success'
  ],
  data () {
    return {
      commentData: null,
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    options () {
      return postCommentFormOptions(
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
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createProfilePostComment,
    createCommunityPostComment,
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

        this.createPostComment(
          createArgs
        )
      }
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.$emit(
          'success',
          this.commentData
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
        profileId: this.profileId,
        communityId: this.communityId,
        postId: this.postId,
        byCommunity: !!fields.community,
        text,
        images: this.imagesFormatted,
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks
      }
    },
    createPostComment (
      args
    ) {
      switch (this.model) {
        case 'profile':
          return this.createProfilePostComment(
            args
          )
        case 'community':
          return this.createCommunityPostComment(
            args
          )
        default:
          return null
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
