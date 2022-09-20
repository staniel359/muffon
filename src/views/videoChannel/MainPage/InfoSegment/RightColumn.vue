<template>
  <div class="right-column">
    <BaseHeader
      class="channel-title"
      tag="h2"
      :text="channelTitle"
    />

    <CountersSection
      :channel-data="channelData"
    />

    <div class="main-labels-section">
      <BaseDateLabel
        :date="created"
      />
    </div>

    <DescriptionSection
      :channel-data="channelData"
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import CountersSection from './RightColumn/CountersSection.vue'
import BaseDateLabel from '@/components/labels/BaseDateLabel.vue'
import DescriptionSection from './RightColumn/DescriptionSection.vue'

export default {
  name: 'RightColumn',
  components: {
    BaseHeader,
    CountersSection,
    BaseDateLabel,
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
    created () {
      return this.channelData.created
    }
  }
}
</script>

<style lang="sass" scoped>
.right-column
  @extend .flex-full
  margin-left: 1em

.channel-title
  margin-bottom: 0.4em !important
</style>
