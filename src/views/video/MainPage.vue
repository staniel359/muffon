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
          :videoData="slotProps.videoData"
        />

        <TitleSection
          :videoData="slotProps.videoData"
        />

        <BaseDivider />

        <CountersDateSection
          :videoData="slotProps.videoData"
        />

        <TagsSection
          :videoData="slotProps.videoData"
        />

        <DescriptionSection
          :videoData="slotProps.videoData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '@/containers/pages/video/BaseVideoPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseEmbed from '@/BaseEmbed.vue'
import TitleSection from './MainPage/TitleSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import CountersDateSection from './MainPage/CountersDateSection.vue'
import TagsSection from './MainPage/TagsSection.vue'
import DescriptionSection from './MainPage/DescriptionSection.vue'

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
    DescriptionSection
  }
}
</script>

<style lang="sass" scoped>
.video-embed
  margin-bottom: 1em
</style>
