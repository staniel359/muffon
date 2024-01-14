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
        :style="contentStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
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
    contentStyle () {
      if (this.isTickable) {
        return {
          'padding-right':
            `${this.gapWidth}px`
        }
      } else {
        return null
      }
    },
    isTickable () {
      return this.contentWidth > (
        this.tickerWidth +
          this.gapWidth
      )
    },
    contentWidth () {
      return (
        this.content?.offsetWidth || 0
      )
    },
    tickerWidth () {
      return (
        this.ticker?.offsetWidth || 0
      )
    },
    contentClone () {
      return this.content.cloneNode(
        true
      )
    },
    isLoopEnd () {
      return (
        this.progress <=
          this.contentWidth * -1
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
      this.progress -= this.speed

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
