<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseVideo
      :video-data="videoData"
      is-with-autoplay
    />

    <TitleOptionsSection
      :video-data="videoData"
    />

    <BaseDivider />

    <div>
      <CountersDateSection
        :video-data="videoData"
      />

      <TagsSection
        :video-data="videoData"
      />
    </div>

    <DescriptionSection
      :video-data="videoData"
    />

    <ArtistSection
      v-if="artistData"
      :artist-data="artistData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseVideo from '@/components/BaseVideo.vue'
import TitleOptionsSection from './InfoSegment/TitleOptionsSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CountersDateSection from './InfoSegment/CountersDateSection.vue'
import TagsSection from './InfoSegment/TagsSection.vue'
import DescriptionSection from './InfoSegment/DescriptionSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseVideo,
    TitleOptionsSection,
    BaseDivider,
    CountersDateSection,
    TagsSection,
    DescriptionSection,
    ArtistSection
  },
  props: {
    videoData: Object
  },
  computed: {
    artistData () {
      return this.videoData.artist
    }
  }
}
</script>

<style lang="sass" scoped></style>
