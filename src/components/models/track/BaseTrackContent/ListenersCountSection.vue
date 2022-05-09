<template>
  <div class="track-listeners-count">
    <div
      class="track-listeners-count-bar"
      :class="{
        inverted: isDarkMode
      }"
      :style="{
        width: listenersCounterBarWidthPercent
      }"
    />

    <div class="description">
      <small>
        <BaseIcon
          icon="user"
        />

        <span
          v-html="listenersCountFormatted"
        />
      </small>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'ListenersCountSection',
  components: {
    BaseIcon
  },
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
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    listenersCounterBarWidthPercent () {
      return `${this.listenersCounterBarWidth}%`
    },
    listenersCounterBarWidth () {
      return (
        this.listenersCount /
          this.topTrackCount * 70
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
  @extend .background-grey
  height: 4px
  border-radius: 2px
  margin-right: 0.5em
  &.inverted
    @extend .background-grey-inverted

.description
  @extend .d-flex, .align-items-center
</style>
