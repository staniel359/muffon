<template>
  <div class="title-options-section">
    <div class="title-section">
      <BaseHeader
        tag="h3"
        :text="videoTitle"
      />

      <BaseVideoChannelLinkSection
        :model-data="videoData"
      />
    </div>

    <BaseVideoOptionsDropdown
      class="video-options"
      :video-data="videoData"
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseVideoOptionsDropdown
  from '@/components/dropdowns/video/BaseVideoOptionsDropdown.vue'

export default {
  name: 'TitleOptionsSection',
  components: {
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseVideoOptionsDropdown
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videoTitle () {
      return this.videoData.title
    }
  }
}
</script>

<style lang="sass" scoped>
.title-options-section
  @extend .d-flex, .align-items-center
  margin-top: 0.75em

.title-section
  @extend .flex-full

.video-options
  margin-left: 1em
</style>
