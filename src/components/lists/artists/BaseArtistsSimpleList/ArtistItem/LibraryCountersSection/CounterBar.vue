<template>
  <div class="description counter-section">
    <div
      class="count-bar"
      :class="{ inverted: isDarkMode }"
      :style="{ width: countBarWidthPercent }"
    ></div>

    <div
      class="main-small-container"
      :class="{ link: isActive }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <small>
        <i
          class="icon"
          :class="icon"
        />
        <span>
          {{ countFormatted }}
        </span>
      </small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { number as formatNumber } from '*/helpers/formatters'

const widthMaxPercent = 70

export default {
  name: 'CounterBar',
  props: {
    artistData: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    topCount: {
      type: Number,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'activeChange'
  ],
  data () {
    return {
      icons: {
        tracks: 'music',
        albums: 'record vinyl'
      }
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    countBarWidthPercent () {
      return `${this.countBarWidth}%`
    },
    countBarWidth () {
      return (
        this.count * widthMaxPercent /
          this.topCount
      )
    },
    count () {
      return this.artistData[
        `${this.scope}_count`
      ]
    },
    countFormatted () {
      return formatNumber(
        this.count
      )
    },
    icon () {
      return this.icons[
        this.scope
      ]
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.counter-section
  @extend .d-flex, .align-items-center

.count-bar
  @extend .background-grey
  height: 4px
  border-radius: 2px
  margin-right: 0.5em
  &.inverted
    @extend .background-grey-inverted
</style>
