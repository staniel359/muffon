<template>
  <div class="counters-date-section">
    <BaseCounterLabels
      :counters="counters"
    />

    <BaseDateLabel
      :date="publishDate"
    />
  </div>
</template>

<script>
import BaseCounterLabels from '*/components/labels/BaseCounterLabels.vue'
import BaseDateLabel from '*/components/labels/BaseDateLabel.vue'

export default {
  name: 'CountersDateSection',
  components: {
    BaseCounterLabels,
    BaseDateLabel
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

<style lang="sass" scoped>
.counters-date-section
  @extend .d-flex, .justify-content-space-between
</style>
