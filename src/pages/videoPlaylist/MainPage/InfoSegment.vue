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
            class="extra"
            :model-data="playlistData"
          />

          <DescriptionSection
            class="description"
            :playlist-data="playlistData"
          />

          <BaseCounterSection
            class="description"
            scope="videos"
            :count="videosCount"
          />

          <BasePublishDateSection
            class="description"
            :model-data="playlistData"
          />
        </div>

        <div class="self-options-section">
          <BaseSelfIcons
            :bookmark-id="bookmarkId"
          />

          <BaseVideoPlaylistOptionsPopup
            :playlist-data="playlistData"
            :bookmark-id="bookmarkId"
            is-with-bookmark-option
            is-with-share-option
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
import DescriptionSection from './InfoSegment/DescriptionSection.vue'
import BaseCounterSection from '@/components/sections/BaseCounterSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseVideoPlaylistOptionsPopup
  from '@/components/popups/videoPlaylist/BaseVideoPlaylistOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    DescriptionSection,
    BaseCounterSection,
    BasePublishDateSection,
    BaseSelfIcons,
    BaseVideoPlaylistOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.playlistData
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    videosCount () {
      return this.playlistData.videos_count
    }
  }
}
</script>

<style lang="sass" scoped>
.self-options-section
  @extend .d-flex, .align-items-center
</style>
