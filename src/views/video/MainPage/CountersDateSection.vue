<template>
  <div class="counters-date-section">
    <div class="ui large labels">
      <BaseLabel
        icon="eye outline"
        :text="viewsCountFormatted"
      />

      <BaseLabel
        icon="thumbs up outline"
        :text="likesCountFormatted"
      />
    </div>

    <div class="ui large labels">
      <BaseLabel
        icon="calendar outline"
        :text="publishDate"
      />
    </div>
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'CountersDateSection',
  components: {
    BaseLabel
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    viewsCountFormatted () {
      return formatNumber(
        this.videoData.views_count
      )
    },
    likesCountFormatted () {
      return formatNumber(
        this.videoData.likes_count
      )
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
