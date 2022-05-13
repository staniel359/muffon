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
      newPostData: null,
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
    imagesFormatted () {
      return this.images.map(
        this.formatImage
      )
    }
  },
  watch: {
    newPostData: 'handleNewPostDataChange'
  },
  methods: {
    updateProfilePost,
    updateCommunityPost,
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
          this.playlists.length ||
          this.communities.length
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
    handleNewPostDataChange (
      value
    ) {
      if (value) {
        this.$emit(
          'success',
          value
        )
      }
    },
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
        text: fields.content,
        images: this.imagesFormatted,
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks,
        playlists: this.playlists,
        communities: this.communities
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
