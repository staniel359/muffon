<template>
  <BaseVideoPageContainer>
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'raised',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseEmbed
          class="video-embed"
          :video-data="slotProps.videoData"
        />

        <TitleSection
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

        <div class="main-basic-segments-container">
          <RelatedSegment
            :video-data="slotProps.videoData"
          />
        </div>
      </BaseSegmentContainer>
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '*/components/containers/pages/video/BaseVideoPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseEmbed from '*/components/BaseEmbed.vue'
import TitleSection from './MainPage/TitleSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import CountersDateSection from './MainPage/CountersDateSection.vue'
import TagsSection from './MainPage/TagsSection.vue'
import DescriptionSection from './MainPage/DescriptionSection.vue'
import RelatedSegment from './MainPage/RelatedSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPageContainer,
    BaseSegmentContainer,
    BaseEmbed,
    TitleSection,
    BaseDivider,
    CountersDateSection,
    TagsSection,
    DescriptionSection,
    RelatedSegment
  }
}
</script>

<style lang="sass" scoped>
.video-embed
  margin-bottom: 1em
</style>
