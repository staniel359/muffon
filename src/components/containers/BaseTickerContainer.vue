<template>
  <div
    class="white-space-no-wrap base-ticker-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="ticker"
      class="ticker d-flex"
    >
      <div ref="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTickerContainer',
  props: {
    isEnabled: {
      type: Boolean,
      default: true
    }
  },
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

    this.setContentPaddingRight(
      this.gapWidth
    )

    if (this.isTickable) {
      this.ticker
        .appendChild(
          this.contentClone
        )
    } else {
      this.setContentPaddingRight(
        0
      )
    }
  },
  methods: {
    handleMouseEnter () {
      if (!this.isEnabled) { return }

      this.activate()
    },
    handleMouseLeave () {
      if (!this.isEnabled) { return }

      this.deactivate()
    },
    handleRequestAnimationFrame () {
      this.animate()
    },
    activate () {
      if (!this.isTickable) { return }

      this.speed = (
        this.speedPixels / 60
      )

      this.animate()
    },
    deactivate () {
      cancelAnimationFrame(
        this.animationFrame
      )

      this.progress = 0

      this.speed = 0

      this.transformTicker()
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
    },
    setContentPaddingRight (
      value
    ) {
      this.content
        .style
        .paddingRight = `${value}px`
    }
  }
}
</script>

<style lang="sass" scoped></style>
