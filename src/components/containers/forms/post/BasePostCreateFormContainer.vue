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
  post as postFormOptions
} from '@/helpers/formatters/plugins/semantic/options/form'
import createProfilePost from '@/helpers/actions/api/profile/post/create'
import createCommunityPost from '@/helpers/actions/api/community/post/create'
import {
  decryptTextWithLinks
} from '@/helpers/utils'

export default {
  name: 'BasePostCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    postType: {
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
    },
    profileId: Number,
    communityId: Number
  },
  emits: [
    'success'
  ],
  data () {
    return {
      postData: null,
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
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
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createProfilePost,
    createCommunityPost,
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

        this.createPost(
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
          this.postData
        )
      }
    },
    createPost (
      args
    ) {
      switch (this.postType) {
        case 'profile':
          return this.createProfilePost(
            args
          )
        case 'community':
          return this.createCommunityPost(
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
    formatCreateArgs (
      fields
    ) {
      const text =
        decryptTextWithLinks(
          fields.content
        )

      return {
        otherProfileId: this.profileId,
        communityId: this.communityId,
        byCommunity: !!fields.community,
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
