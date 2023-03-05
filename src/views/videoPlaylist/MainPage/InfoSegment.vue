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
            class="description"
            v-text="description"
          />

          <BaseVideoPlaylistVideosCountSection
            class="description"
            :playlist-data="playlistData"
          />

          <BasePublishDateSection
            class="description publish-date"
            :model-data="playlistData"
          />
        </div>

        <div class="self-options-section">
          <BaseSelfIcons
            :bookmark-id="bookmarkId"
          />

          <BaseVideoPlaylistOptionsDropdown
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
import BaseVideoPlaylistVideosCountSection
  from '@/components/sections/videoPlaylist/BaseVideoPlaylistVideosCountSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseVideoPlaylistOptionsDropdown
  from '@/components/dropdowns/videoPlaylist/BaseVideoPlaylistOptionsDropdown.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseVideoPlaylistVideosCountSection,
    BasePublishDateSection,
    BaseSelfIcons,
    BaseVideoPlaylistOptionsDropdown
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
    description () {
      return this.playlistData.description
    }
  }
}
</script>

<style lang="sass" scoped>
.self-options-section
  @extend .d-flex, .align-items-center

.publish-date
  @extend .no-margin
</style>
