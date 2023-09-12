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
import updateProfilePostComment
  from '@/helpers/actions/api/profile/post/comment/update'
import updateCommunityPostComment
  from '@/helpers/actions/api/community/post/comment/update'
import {
  decryptTextWithLinks
} from '@/helpers/utils'

export default {
  name: 'BasePostCommentUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    commentData: {
      type: Object,
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
    videos: {
      type: Array,
      default () {
        return []
      }
    },
    videoChannels: {
      type: Array,
      default () {
        return []
      }
    },
    videoPlaylists: {
      type: Array,
      default () {
        return []
      }
    },
    playlists: {
      type: Array,
      default () {
        return []
      }
    },
    communities: {
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
      newCommentData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    profileId () {
      return this.otherProfileData?.id
    },
    otherProfileData () {
      return this.postData.profile
    },
    postData () {
      return this.commentData.post
    },
    communityId () {
      return this.communityData?.id
    },
    communityData () {
      return this.postData.community
    },
    postId () {
      return this.postData.id
    },
    commentId () {
      return this.commentData.id
    },
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
    },
    model () {
      if (this.otherProfileData) {
        return 'profile'
      } else if (this.communityData) {
        return 'community'
      } else {
        return null
      }
    }
  },
  watch: {
    newCommentData:
      'handleNewCommentDataChange'
  },
  methods: {
    updateProfilePostComment,
    updateCommunityPostComment,
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
          this.tracks.length ||
          this.videos.length ||
          this.videoChannels.length ||
          this.videoPlaylists.length ||
          this.playlists.length ||
          this.communities.length
      )

      if (isContentData) {
        const updateArgs =
          this.formatUpdateArgs(
            fields
          )

        this.updatePostComment(
          updateArgs
        )
      }
    },
    handleNewCommentDataChange (
      value
    ) {
      if (value) {
        this.$emit(
          'success',
          value
        )
      }
    },
    updatePostComment (
      args
    ) {
      switch (this.model) {
        case 'profile':
          return this.updateProfilePostComment(
            args
          )
        case 'community':
          return this.updateCommunityPostComment(
            args
          )
        default:
          return null
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
      const text =
        decryptTextWithLinks(
          fields.content
        )

      return {
        profileId: this.profileId,
        communityId:
          this.communityId,
        postId: this.postId,
        commentId: this.commentId,
        byCommunity:
          !!fields.community,
        text,
        images:
          this.imagesFormatted,
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks,
        videos: this.videos,
        videoChannels:
          this.videoChannels,
        videoPlaylists:
          this.videoPlaylists,
        playlists: this.playlists,
        communities:
          this.communities
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
