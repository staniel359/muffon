<template>
  <BaseCounterLabelsSection
    class="main-labels-section"
    :counters="counters"
  />
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'

export default {
  name: 'CountersSection',
  components: {
    BaseCounterLabelsSection
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    counters () {
      return [
        {
          scope: 'subscribers',
          count: this.subscribersCount
        },
        {
          scope: 'views',
          count: this.viewsCount
        },
        {
          scope: 'videos',
          count: this.videosCount
        }
      ]
    },
    subscribersCount () {
      return this.statisticsData.subscribers_count
    },
    statisticsData () {
      return this.channelData.statistics
    },
    viewsCount () {
      return this.statisticsData.views_count
    },
    videosCount () {
      return this.statisticsData.videos_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
