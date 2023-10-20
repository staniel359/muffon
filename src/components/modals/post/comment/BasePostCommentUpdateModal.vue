<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="scrolling content">
      <BasePostCommentUpdateFormContainer
        class="main-sendable-form"
        :comment-data="commentData"
        :images="images"
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
        :videos="videos"
        :video-channels="videoChannels"
        :video-playlists="videoPlaylists"
        :playlists="playlists"
        :communities="communities"
        @success="handleSuccess"
      >
        <BaseContentField
          ref="content"
          :value="text"
          @submit="handleSubmit"
        />

        <BaseSendableFormContentSection
          :images="images"
          :artists="artists"
          :albums="albums"
          :tracks="tracks"
          :videos="videos"
          :video-channels="videoChannels"
          :video-playlists="videoPlaylists"
          :playlists="playlists"
          :communities="communities"
          @link-click="handleLinkClick"
        />

        <div class="as-community-container">
          <BaseAsCommunityField
            v-if="isWithAsCommunityOption"
            :is-checked="isByCommunity"
          />
        </div>

        <div class="buttons-container">
          <BaseFormAddButtonsSection
            :key="key"
            :artists="artists"
            :albums="albums"
            :tracks="tracks"
          />

          <BaseSubmitButton
            ref="submit"
            action-key="save"
          />
        </div>
      </BasePostCommentUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePostCommentUpdateFormContainer
  from '@/components/containers/forms/post/comment/BasePostCommentUpdateFormContainer.vue'
import BaseContentField from '@/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '@/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '@/components/forms/BaseFormAddButtonsSection.vue'
import BaseAsCommunityField from '@/components/fields/BaseAsCommunityField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '@/mixins/sendableFormMixin'
import {
  generateKey
} from '@/helpers/utils'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  convertLinkToData as convertImageLinkToData
} from '@/helpers/actions/image'

export default {
  name: 'BasePostCommentUpdateModal',
  components: {
    BaseModalContainer,
    BasePostCommentUpdateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BaseAsCommunityField,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    commentData: {
      type: Object,
      required: true
    },
    isWithAsCommunityOption: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      key: null,
      videos: [],
      videoChannels: [],
      videoPlaylists: [],
      playlists: [],
      communities: []
    }
  },
  computed: {
    text () {
      return this.commentData.text
    },
    commentImages () {
      return (
        this.commentData
          .attachments
          ?.images || []
      )
    },
    commentVideosFormatted () {
      return formatCollection(
        this.commentVideos
      )
    },
    commentVideos () {
      return (
        this.commentData
          .attachments
          ?.videos || []
      )
    },
    commentVideoChannelsFormatted () {
      return formatCollection(
        this.commentVideoChannels
      )
    },
    commentVideoChannels () {
      return (
        this.commentData
          .attachments
          ?.video_channels || []
      )
    },
    commentVideoPlaylistsFormatted () {
      return formatCollection(
        this.commentVideoPlaylists
      )
    },
    commentVideoPlaylists () {
      return (
        this.commentData
          .attachments
          ?.video_playlists || []
      )
    },
    commentArtistsFormatted () {
      return formatCollection(
        this.commentArtists
      )
    },
    commentArtists () {
      return (
        this.commentData
          .attachments
          ?.artists || []
      )
    },
    commentAlbumsFormatted () {
      return formatCollection(
        this.commentAlbums
      )
    },
    commentAlbums () {
      return (
        this.commentData
          .attachments
          ?.albums || []
      )
    },
    commentTracksFormatted () {
      return formatCollection(
        this.commentTracks
      )
    },
    commentTracks () {
      return (
        this.commentData
          .attachments
          ?.tracks || []
      )
    },
    commentPlaylistsFormatted () {
      return formatCollection(
        this.commentPlaylists
      )
    },
    commentPlaylists () {
      return (
        this.commentData
          .attachments
          ?.playlists || []
      )
    },
    commentCommunitiesFormatted () {
      return formatCollection(
        this.commentCommunities
      )
    },
    commentCommunities () {
      return (
        this.commentData
          .attachments
          ?.communities || []
      )
    },
    isByCommunity () {
      return !!this.commentData.by_community
    }
  },
  mounted () {
    this.commentImages.forEach(
      this.processImage
    )

    this.artists =
      this.commentArtistsFormatted

    this.albums =
      this.commentAlbumsFormatted

    this.tracks =
      this.commentTracksFormatted

    this.videos =
      this.commentVideosFormatted

    this.videoChannels =
      this.commentVideoChannelsFormatted

    this.videoPlaylists =
      this.commentVideoPlaylistsFormatted

    this.playlists =
      this.commentPlaylistsFormatted

    this.communities =
      this.commentCommunitiesFormatted
  },
  methods: {
    handleVisible () {
      this.focusContent()

      this.key = generateKey()
    },
    handleSubmit () {
      this.clickSubmit()
    },
    handleLinkClick () {
      this.hide()
    },
    handleSuccess (
      value
    ) {
      this.$emit(
        'success',
        value
      )
    },
    async processImage (
      imageData
    ) {
      const image =
        await convertImageLinkToData(
          {
            link: imageData.original
          }
        )

      this.images.push(
        image
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    focusContent () {
      this.$refs
        .content
        .focus()
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
