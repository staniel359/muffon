<template>
  <BaseSegmentContainer>
    <BaseListContainer>
      <div class="item main-simple-list-item main-info-item">
        <div class="image-container">
          <BaseZoomableImage
            model="videoPlaylist"
            size="extrasmall"
            :image-data="imageData"
          />
        </div>

        <div class="content">
          <BaseHeader
            tag="h3"
            :text="playlistTitle"
          />

          <BaseVideoChannelLinkSection
            :model-data="playlistData"
          />

          <div
            v-if="description"
            class="extra"
            v-text="description"
          />

          <BaseVideoPlaylistVideosCountSection
            class="description"
            :playlist-data="playlistData"
          />

          <BasePublishDateSection
            class="description"
            :model-data="playlistData"
          />
        </div>
      </div>
    </BaseListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseVideoPlaylistVideosCountSection
  from '@/components/sections/videoPlaylist/BaseVideoPlaylistVideosCountSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
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
