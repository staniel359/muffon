<template>
  <div class="ticker-container">
    <div
      class="ticker"
      ref="ticker"
    >
      <div
        ref="content"
        :style="{ 'padding-right': `${gapWidth}px` }"
      >
        <BaseLink
          v-if="link"
          :link="link"
          :text="text"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLink from '@/BaseLink.vue'

export default {
  name: 'BaseTicker',
  components: {
    BaseLink
  },
  props: {
    text: {
      type: String,
      required: true
    },
    speedPixels: {
      type: Number,
      default: 40
    },
    waitTime: {
      type: Number,
      default: 2000
    },
    gapWidth: {
      type: Number,
      default: 50
    },
    isStartWait: {
      type: Boolean,
      default: true
    },
    isLoopWait: {
      type: Boolean,
      default: true
    },
    link: Object
  },
  data () {
    return {
      ticker: null,
      content: null,
      speed: 0,
      progress: 1
    }
  },
  computed: {
    isTickable () {
      return this.contentWidth > (
        this.tickerWidth + this.gapWidth
      )
    },
    contentWidth () {
      return this.content.offsetWidth
    },
    tickerWidth () {
      return this.ticker.offsetWidth
    },
    contentClone () {
      return this.content.cloneNode(true)
    },
    isLoopEnd () {
      return (
        this.progress <=
          this.contentWidth * -1
      )
    }
  },
  mounted () {
    this.ticker = this.$refs.ticker
    this.content = this.$refs.content

    this.setTicker()
  },
  methods: {
    handleLoopEnd () {
      this.progress = 0

      this.waitAndSetSpeed({
        isWait: this.isLoopWait
      })
    },
    setTicker () {
      if (this.isTickable) {
        this.addContentClone()
        this.waitAndSetSpeed({
          isWait: this.isStartWait
        })
        this.animate()
      }
    },
    addContentClone () {
      this.ticker.appendChild(this.contentClone)
    },
    waitAndSetSpeed ({ isWait }) {
      this.speed = 0

      const timeout = isWait ? this.waitTime : 0

      setTimeout(this.setSpeed, timeout)
    },
    setSpeed () {
      this.speed = this.speedPixels / 60
    },
    animate () {
      this.progress -= this.speed

      this.transformTicker()

      this.isLoopEnd && this.handleLoopEnd()

      requestAnimationFrame(() => {
        this.animate()
      })
    },
    transformTicker () {
      this.ticker.style.transform =
        `translateX(${this.progress}px)`
    }
  }
}
</script>

<style lang="sass" scoped>
.ticker-container
  @extend .overflow-hidden, .white-space-no-wrap

.ticker
  @extend .d-flex
  will-change: transform
</style>
