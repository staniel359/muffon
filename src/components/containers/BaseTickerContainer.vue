<template>
  <div
    class="white-space-no-wrap"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="ticker"
      class="ticker d-flex"
    >
      <div
        ref="content"
        :style="{
          [`padding-${paddingDirection}`]:
            `${gapWidth}px`
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseTickerContainer',
  data () {
    return {
      content: null,
      animationFrame: null,
      ticker: null,
      gapWidth: 40,
      progress: 1,
      speed: 0,
      speedPixels: 40
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    ),
    isTickable () {
      return this.contentWidth > (
        this.tickerWidth +
          this.gapWidth
      )
    },
    contentWidth () {
      return this.content.offsetWidth
    },
    tickerWidth () {
      return this.ticker.offsetWidth
    },
    contentClone () {
      return this.content.cloneNode(
        true
      )
    },
    isLoopEnd () {
      if (this.isRtl) {
        return (
          this.progress >=
            this.contentWidth
        )
      } else {
        return (
          this.progress <=
            this.contentWidth * -1
        )
      }
    },
    paddingDirection () {
      return (
        this.isRtl ? 'left' : 'right'
      )
    }
  },
  mounted () {
    const {
      ticker,
      content
    } = this.$refs

    this.ticker = ticker
    this.content = content

    if (this.isTickable) {
      this.ticker.appendChild(
        this.contentClone
      )
    }
  },
  methods: {
    handleMouseEnter () {
      if (this.isTickable) {
        this.speed = (
          this.speedPixels / 60
        )

        this.animate()
      }
    },
    handleMouseLeave () {
      cancelAnimationFrame(
        this.animationFrame
      )

      this.progress = 0
      this.speed = 0

      this.transformTicker()
    },
    handleRequestAnimationFrame () {
      this.animate()
    },
    animate () {
      if (this.isRtl) {
        this.progress += this.speed
      } else {
        this.progress -= this.speed
      }

      this.transformTicker()

      if (this.isLoopEnd) {
        this.progress = 0
      }

      this.animationFrame =
        requestAnimationFrame(
          this.handleRequestAnimationFrame
        )
    },
    transformTicker () {
      this.ticker
        .style
        .transform =
          `translateX(${this.progress}px)`
    }
  }
}
</script>

<style lang="sass" scoped>
.ticker
  will-change: transform
</style>
