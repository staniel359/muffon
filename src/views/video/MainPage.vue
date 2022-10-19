<template>
  <BaseVideoPageContainer
    :video-id="videoId"
  >
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'raised main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseVideo
          :video-data="slotProps.videoData"
          is-with-autoplay
        />

        <TitleOptionsSection
          :video-data="slotProps.videoData"
        />

        <BaseDivider />

        <CountersDateSection
          :video-data="slotProps.videoData"
        />

        <TagsSection
          :video-data="slotProps.videoData"
        />

        <DescriptionSection
          :video-data="slotProps.videoData"
        />

        <RelatedSegment
          :video-data="slotProps.videoData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '@/components/containers/pages/video/BaseVideoPageContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseVideo from '@/components/BaseVideo.vue'
import TitleOptionsSection from './MainPage/TitleOptionsSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CountersDateSection from './MainPage/CountersDateSection.vue'
import TagsSection from './MainPage/TagsSection.vue'
import DescriptionSection from './MainPage/DescriptionSection.vue'
import RelatedSegment from './MainPage/RelatedSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPageContainer,
    BaseSegmentContainer,
    BaseVideo,
    TitleOptionsSection,
    BaseDivider,
    CountersDateSection,
    TagsSection,
    DescriptionSection,
    RelatedSegment
  },
  props: {
    videoId: String
  }
}
</script>

<style lang="sass" scoped></style>
