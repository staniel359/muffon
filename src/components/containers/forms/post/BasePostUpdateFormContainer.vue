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
  postFormOptions
} from '*/helpers/data/plugins/semantic'
import updateProfilePost from '*/helpers/actions/api/profile/post/update'
import updateCommunityPost from '*/helpers/actions/api/community/post/update'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default {
  name: 'BasePostUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    postData: {
      type: Object,
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
    postId () {
      return this.postData.id
    },
    postType () {
      return this.postData.post_type
    },
    communityId () {
      return this.postData.community?.id
    },
    options () {
      return postFormOptions(
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
  methods: {
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
        const updateArgs =
          this.formatUpdateArgs(
            fields
          )

        this.updatePost(
          updateArgs
        )
      }
    },
    updateProfilePost,
    updateCommunityPost,
    updatePost (
      args
    ) {
      switch (this.postType) {
        case 'profile':
          return this.updateProfilePost(
            args
          )
        case 'community':
          return this.updateCommunityPost(
            args
          )
        default:
          return null
      }
    },
    formatTrack (
      trackData
    ) {
      const artistName =
        formatArtistName(
          trackData.artists ||
            [
              trackData.artist
            ]
        )

      return {
        title: trackData.title,
        artist: {
          name: artistName
        }
      }
    },
    formatImage (
      imageData
    ) {
      return imageData.data
    },
    formatUpdateArgs (
      fields
    ) {
      return {
        communityId: this.communityId,
        postId: this.postId,
        byCommunity: !!fields.community,
        content: fields.content,
        tracks: this.tracksFormatted,
        images: this.imagesFormatted
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
