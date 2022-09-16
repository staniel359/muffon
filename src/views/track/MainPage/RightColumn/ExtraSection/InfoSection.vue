<template>
  <div>
    <div class="main-labels-section">
      <BaseCounterLabels
        :counters="counters"
      />
    </div>

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
import BaseCounterLabels from '*/components/labels/BaseCounterLabels.vue'
import BaseTrackTags from '*/components/models/track/BaseTrackTags.vue'
import BaseTrackDescription
  from '*/components/models/track/BaseTrackDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseCounterLabels,
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
