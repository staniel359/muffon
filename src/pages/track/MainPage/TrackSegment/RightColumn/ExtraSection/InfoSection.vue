<template>
  <div>
    <BaseCounterLabelsSection
      class="main-labels-section"
      :counters="counters"
    />

    <BaseTrackInnerCounterLabelsSection
      class="main-labels-section"
      :track-data="trackData"
    />

    <BaseTrackTags
      class="main-labels-section"
      :track-data="trackData"
      :request-track-data="requestTrackData"
    />
  </div>

  <BaseTrackDescription
    :track-data="trackData"
    :request-track-data="requestTrackData"
  />
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseTrackInnerCounterLabelsSection
  from '@/components/sections/track/BaseTrackInnerCounterLabelsSection.vue'
import BaseTrackTags from '@/components/models/track/BaseTrackTags.vue'
import BaseTrackDescription
  from '@/components/models/track/BaseTrackDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseCounterLabelsSection,
    BaseTrackInnerCounterLabelsSection,
    BaseTrackTags,
    BaseTrackDescription
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  computed: {
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount
        },
        {
          scope: 'plays',
          count: this.playsCount
        }
      ]
    },
    listenersCount () {
      return this.trackData.listeners_count
    },
    playsCount () {
      return this.trackData.plays_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
