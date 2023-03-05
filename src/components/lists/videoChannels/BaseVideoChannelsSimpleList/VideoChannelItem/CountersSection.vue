<template>
  <div class="counters-section">
    <small>
      <span class="counter-section">
        <BaseIcon
          icon="video"
        />

        <span
          v-text="videosCountFormatted"
        />
      </span>

      <span class="counter-section">
        <BaseIcon
          icon="subscriber"
        />

        <span
          v-text="subscribersCountFormatted"
        />
      </span>
    </small>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'CountersSection',
  components: {
    BaseIcon
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videosCountFormatted () {
      return formatNumber(
        this.videosCount
      )
    },
    videosCount () {
      return this.channelData
        .statistics
        .videos_count
    },
    subscribersCountFormatted () {
      return formatNumber(
        this.subscribersCount
      )
    },
    subscribersCount () {
      return this.channelData
        .statistics
        .subscribers_count
    }
  }
}
</script>

<style lang="sass" scoped>
.counters-section
  margin-top: 0.15em

.counter-section
  &:not(:first-child)
    margin-left: 0.75em
</style>
