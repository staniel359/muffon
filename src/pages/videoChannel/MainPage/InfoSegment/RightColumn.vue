<template>
  <div class="main-right-column">
    <BaseHeader
      class="main-top-small-section"
      tag="h2"
      :text="channelTitle"
    />

    <CountersSection
      :channel-data="channelData"
    />

    <BaseDateLabelSection
      class="main-labels-section"
      :date="publishDate"
    />

    <DescriptionSection
      :channel-data="channelData"
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import CountersSection from './RightColumn/CountersSection.vue'
import BaseDateLabelSection
  from '@/components/sections/BaseDateLabelSection.vue'
import DescriptionSection from './RightColumn/DescriptionSection.vue'

export default {
  name: 'RightColumn',
  components: {
    BaseHeader,
    CountersSection,
    BaseDateLabelSection,
    DescriptionSection
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    channelTitle () {
      return this.channelData.title
    },
    publishDate () {
      return this.channelData.publish_date
    }
  }
}
</script>

<style lang="sass" scoped></style>
