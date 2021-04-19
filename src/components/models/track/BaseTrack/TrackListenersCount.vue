<template>
  <div class="track-listeners-count">
    <div
      class="track-listeners-count-bar"
      :style="{ width: listenersCounterBarWidthFormatted }"
    ></div>

    <div class="description track-listeners-count-text">
      <i class="user small icon" />
      <span>
        {{ listenersCountFormatted }}
      </span>
    </div>
  </div>
</template>

<script>
import { number as formatNumber } from '#/formatters'

const widthMaxPercent = 70

export default {
  name: 'TrackListenersCount',
  props: {
    listenersCount: {
      type: Number,
      required: true
    },
    topTrackCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    listenersCounterBarWidthFormatted () {
      return `${this.listenersCounterBarWidth}%`
    },
    listenersCounterBarWidth () {
      return (
        this.listenersCount * widthMaxPercent /
          this.topTrackCount
      )
    },
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.track-listeners-count
  @extend .d-flex, .align-items-center

.track-listeners-count-bar
  background: $colorGrey
  height: 4px
  border-radius: 2px
  margin-right: $trackContentMarginWidth

.track-listeners-count-text
  @extend .d-flex, .align-items-center
</style>
