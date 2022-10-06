<template>
  <div class="main-labels-section">
    <BaseCounterLabelsSection
      :counters="counters"
    />
  </div>

  <div class="main-labels-section">
    <BaseDateLabelSection
      :date="publishDate"
    />
  </div>
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseDateLabelSection
  from '@/components/sections/BaseDateLabelSection.vue'

export default {
  name: 'CountersDateSection',
  components: {
    BaseCounterLabelsSection,
    BaseDateLabelSection
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    counters () {
      return [
        {
          scope: 'views',
          count: this.viewsCount
        },
        {
          scope: 'likes',
          count: this.likesCount
        }
      ]
    },
    viewsCount () {
      return this.videoData.views_count
    },
    likesCount () {
      return this.videoData.likes_count
    },
    publishDate () {
      return this.videoData.publish_date
    }
  }
}
</script>

<style lang="sass" scoped></style>
