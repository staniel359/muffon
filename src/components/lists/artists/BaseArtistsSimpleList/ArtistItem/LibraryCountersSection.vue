<template>
  <div class="library-counters-container">
    <div
      v-if="isWithTracksCount"
      class="description"
    >
      <div
        class="count-bar"
        :class="{ inverted: isDarkMode }"
        :style="{ width: tracksCounterBarWidthFormatted }"
      ></div>

      <div
        class="main-small-container"
        :class="{ link: isTracksLinkActive }"
        @mouseenter="handleTracksLinkMouseEnter"
        @mouseleave="handleTracksLinkMouseLeave"
      >
        <small>
          <i class="music icon" />
          <span>
            {{ tracksCountFormatted }}
          </span>
        </small>
      </div>
    </div>

    <div
      v-if="isWithAlbumsCount"
      class="description"
    >
      <div
        class="count-bar"
        :class="{ inverted: isDarkMode }"
        :style="{ width: albumsCounterBarWidthFormatted }"
      ></div>

      <div
        class="main-small-container"
        :class="{ link: isAlbumsLinkActive }"
        @mouseenter="handleAlbumsLinkMouseEnter"
        @mouseleave="handleAlbumsLinkMouseLeave"
      >
        <small>
          <i class="record vinyl icon" />
          <span>
            {{ albumsCountFormatted }}
          </span>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { number as formatNumber } from '#/formatters'

const widthMaxPercent = 70

export default {
  name: 'LibraryCountersSection',
  props: {
    isWithTracksCount: Boolean,
    tracksCount: Number,
    topTracksCount: Number,
    isWithAlbumsCount: Boolean,
    albumsCount: Number,
    topAlbumsCount: Number
  },
  emits: [
    'tracksLinkActiveChange',
    'albumsLinkActiveChange'
  ],
  data () {
    return {
      isTracksLinkActive: false,
      isAlbumsLinkActive: false
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    tracksCounterBarWidthFormatted () {
      return `${this.tracksCounterBarWidth}%`
    },
    tracksCounterBarWidth () {
      return (
        this.tracksCount * widthMaxPercent /
          this.topTracksCount
      )
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
    albumsCounterBarWidthFormatted () {
      return `${this.albumsCounterBarWidth}%`
    },
    albumsCounterBarWidth () {
      return (
        this.albumsCount * widthMaxPercent /
          this.topAlbumsCount
      )
    },
    albumsCountFormatted () {
      return formatNumber(
        this.albumsCount
      )
    }
  },
  methods: {
    handleTracksLinkMouseEnter () {
      this.isTracksLinkActive = true

      this.$emit(
        'tracksLinkActiveChange',
        true
      )
    },
    handleTracksLinkMouseLeave () {
      this.isTracksLinkActive = false

      this.$emit(
        'tracksLinkActiveChange',
        false
      )
    },
    handleAlbumsLinkMouseEnter () {
      this.isAlbumsLinkActive = true

      this.$emit(
        'albumsLinkActiveChange',
        true
      )
    },
    handleAlbumsLinkMouseLeave () {
      this.isAlbumsLinkActive = false

      this.$emit(
        'albumsLinkActiveChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-container
  margin-top: 0.25em

.tracks-count, .albums-count
  @extend .d-flex, .align-items-center

.count-bar
  @extend .background-grey
  height: 4px
  border-radius: 2px
  margin-right: $trackContentMarginWidth
  &.inverted
    @extend .background-grey-inverted

.description
  @extend .d-flex, .align-items-center
</style>
