<template>
  <div class="ui large labels">
    <BaseLabel
      icon="calendar outline"
      :text="publishDate"
    />

    <BaseLabel
      icon="eye outline"
      :text="viewsCountFormatted"
    />

    <BaseLabel
      icon="thumbs up outline"
      :text="likesCountFormatted"
    />
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import { number as formatNumber } from '*/helpers/formatters'

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
    publishDate () {
      return this.videoData.publish_date
    },
    viewsCountFormatted () {
      return formatNumber(
        this.videoData.views_count
      )
    },
    likesCountFormatted () {
      return formatNumber(
        this.videoData.likes_count
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
