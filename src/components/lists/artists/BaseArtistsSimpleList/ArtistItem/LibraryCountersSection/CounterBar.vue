<template>
  <div class="description counter-section">
    <div
      class="count-bar"
      :class="{
        inverted: isDarkMode
      }"
      :style="{
        width: countBarWidthFormatted
      }"
    />

    <div
      class="main-small-container"
      :class="{
        link: isActive
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <small>
        <BaseIcon
          :icon="icon"
        />

        <span
          v-text="countFormatted"
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
  name: 'CounterBar',
  components: {
    BaseIcon
  },
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
      widthMaxPercent: 70,
      icons: {
        tracks: 'music',
        albums: 'record vinyl'
      }
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    countBarWidthFormatted () {
      return `${this.countBarWidth}%`
    },
    countBarWidth () {
      return (
        this.count * this.widthMaxPercent /
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
