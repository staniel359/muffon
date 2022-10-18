<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="link"
  >
    <BaseImage
      class="rounded bordered"
      model="videoPlaylist"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="playlistTitle"
      />

      <div
        v-if="description"
        class="extra"
      >
        <small
          v-html="description"
        />
      </div>

      <BaseVideoPlaylistVideosCountSection
        class="description"
        :playlist-data="playlistData"
        is-small
      />

      <BasePublishDateSection
        class="description"
        :model-data="playlistData"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoPlaylistVideosCountSection
  from '@/components/sections/videoPlaylist/BaseVideoPlaylistVideosCountSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import {
  main as formatVideoPlaylistMainLink
} from '@/helpers/formatters/links/videoPlaylist'

export default {
  name: 'VideoPlaylistItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseVideoPlaylistVideosCountSection,
    BasePublishDateSection
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return formatVideoPlaylistMainLink(
        {
          playlistId: this.playlistId
        }
      )
    },
    playlistId () {
      return this.playlistData.source.id
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    description () {
      return this.playlistData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
