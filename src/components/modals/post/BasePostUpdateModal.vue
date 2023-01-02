<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="scrolling content">
      <BasePostUpdateFormContainer
        class="main-post-form"
        :post-data="postData"
        :images="images"
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
        :videos="videos"
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
          :video-playlists="videoPlaylists"
          :playlists="playlists"
          :communities="communities"
          @link-click="handleLinkClick"
        />

        <div class="as-community-container">
          <BasePostAsCommunityField
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
            is-modal
          />

          <BaseSubmitButton
            ref="submit"
            action-key="save"
          />
        </div>
      </BasePostUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePostUpdateFormContainer
  from '@/components/containers/forms/post/BasePostUpdateFormContainer.vue'
import BaseContentField from '@/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '@/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '@/components/forms/BaseFormAddButtonsSection.vue'
import BasePostAsCommunityField
  from '@/components/fields/post/BasePostAsCommunityField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '@/mixins/sendableFormMixin'
import {
  generateKey
} from '#/helpers/utils'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BasePostUpdateModal',
  components: {
    BaseModalContainer,
    BasePostUpdateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BasePostAsCommunityField,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    postData: {
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
      videoPlaylists: [],
      playlists: [],
      communities: []
    }
  },
  computed: {
    text () {
      return this.postData.text
    },
    postImages () {
      return this.postData.attachments?.images || []
    },
    postVideosFormatted () {
      return formatCollection(
        this.postVideos
      )
    },
    postVideos () {
      return this.postData.attachments?.videos || []
    },
    postVideoPlaylistsFormatted () {
      return formatCollection(
        this.postVideoPlaylists
      )
    },
    postVideoPlaylists () {
      return this.postData.attachments?.video_playlists || []
    },
    postArtistsFormatted () {
      return formatCollection(
        this.postArtists
      )
    },
    postArtists () {
      return this.postData.attachments?.artists || []
    },
    postAlbumsFormatted () {
      return formatCollection(
        this.postAlbums
      )
    },
    postAlbums () {
      return this.postData.attachments?.albums || []
    },
    postTracksFormatted () {
      return formatCollection(
        this.postTracks
      )
    },
    postTracks () {
      return this.postData.attachments?.tracks || []
    },
    postPlaylistsFormatted () {
      return formatCollection(
        this.postPlaylists
      )
    },
    postPlaylists () {
      return this.postData.attachments?.playlists || []
    },
    postCommunitiesFormatted () {
      return formatCollection(
        this.postCommunities
      )
    },
    postCommunities () {
      return this.postData.attachments?.communities || []
    },
    isByCommunity () {
      return this.postData.by_community
    }
  },
  mounted () {
    this.postImages.forEach(
      this.processImage
    )

    this.artists =
      this.postArtistsFormatted
    this.albums =
      this.postAlbumsFormatted
    this.tracks =
      this.postTracksFormatted
    this.videos =
      this.postVideosFormatted
    this.videoPlaylists =
      this.postVideoPlaylistsFormatted
    this.playlists =
      this.postPlaylistsFormatted
    this.communities =
      this.postCommunitiesFormatted
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
    handleImageLoadEnd (
      {
        reader,
        file
      }
    ) {
      const url =
        URL.createObjectURL(
          file
        )

      const imageData = {
        uuid: generateKey(),
        url,
        data: reader.result
      }

      this.images.push(
        imageData
      )
    },
    async processImage (
      imageData
    ) {
      const data = await fetch(
        imageData.original
      )

      const file = await data.blob()

      const reader = new FileReader()

      reader.onloadend = () => {
        this.handleImageLoadEnd(
          {
            reader,
            file
          }
        )
      }

      reader.readAsDataURL(
        file
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
