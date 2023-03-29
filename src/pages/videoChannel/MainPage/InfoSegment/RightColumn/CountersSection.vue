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
          scope: 'videos',
          count: this.videosCount
        },
        {
          scope: 'subscribers',
          count: this.subscribersCount
        },
        {
          scope: 'views',
          count: this.viewsCount
        }
      ]
    },
    subscribersCount () {
      return this.channelData.subscribers_count
    },
    viewsCount () {
      return this.channelData.views_count
    },
    videosCount () {
      return this.channelData.videos_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
