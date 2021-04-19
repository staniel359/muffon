<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BaseAudioVisualiser',
  data () {
    return {
      animationFrame: null,
      canvasHeight: 256,
      fftSize: 512,
      barWidth: 1,
      barGapWidth: 1
    }
  },
  computed: {
    ...mapState('audio', {
      audioElement: 'element',
      audioContext: 'context',
      audioSource: 'source',
      audioStatus: 'status'
    }),
    canvasWidth () {
      return this.barsCount * (
        this.barWidth + this.barGapWidth
      )
    },
    barsCount () {
      return this.fftSize / 2
    },
    canvasContext () {
      return this.$refs.canvas.getContext('2d')
    },
    analyser () {
      return this.audioContext.createAnalyser()
    },
    barsArray () {
      return new Uint8Array(this.barsCount)
    }
  },
  watch: {
    audioStatus: {
      immediate: true,
      handler: 'handleAudioStatusChange'
    }
  },
  mounted () {
    this.setCanvasData()
    this.setCanvasContextData()
    this.setAudioContextData()
    this.setAudioSourceData()
    this.setAudioSourceConnections()
    this.setAnalyserData()
  },
  unmounted () {
    this.stopAnimation()
  },
  methods: {
    ...mapActions('audio', {
      setAudioContext: 'setContext',
      setAudioSource: 'setSource'
    }),
    handleAudioStatusChange (value) {
      if (value === 'play') {
        this.setAnimation()
      } else {
        this.stopAnimation()
      }
    },
    setCanvasData () {
      this.$refs.canvas.width = this.canvasWidth
      this.$refs.canvas.height = this.canvasHeight
    },
    setCanvasContextData () {
      const gradient = this.canvasContext.createLinearGradient(
        0, 0, 0, this.canvasHeight
      )

      const colorPale = '#b589d6'
      const colorBase = '#804fb3'

      gradient.addColorStop(0, colorPale)
      gradient.addColorStop(1, colorBase)

      this.canvasContext.fillStyle = gradient
    },
    setAudioContextData () {
      if (!this.audioContext) {
        const context = new AudioContext()

        this.setAudioContext(context)
      }
    },
    setAudioSourceData () {
      if (!this.audioSource) {
        const source = this.audioContext.createMediaElementSource(
          this.audioElement
        )

        this.setAudioSource(source)
      }
    },
    setAudioSourceConnections () {
      this.audioSource.connect(this.analyser)
      this.audioSource.connect(
        this.audioContext.destination
      )
    },
    setAnalyserData () {
      this.analyser.fftSize = this.fftSize
    },
    setAnimation () {
      this.animationFrame = requestAnimationFrame(() => {
        this.setFrame()
        this.setAnimation()
      })
    },
    setFrame () {
      this.clearCanvas()
      this.setFrequencyData()
      this.setBars()
    },
    clearCanvas () {
      this.canvasContext.clearRect(
        0, 0, this.canvasWidth, this.canvasHeight
      )
    },
    setFrequencyData () {
      this.analyser.getByteFrequencyData(this.barsArray)
    },
    setBars () {
      this.barsArray.forEach(this.setBar)
    },
    setBar (value, index) {
      return this.canvasContext.fillRect(
        this.getBarStartX(index),
        this.getBarStartY(value),
        this.barWidth,
        value
      )
    },
    getBarStartX (index) {
      return index * (this.barWidth + this.barGapWidth)
    },
    getBarStartY (value) {
      return this.canvasHeight - value
    },
    stopAnimation () {
      cancelAnimationFrame(this.animationFrame)
    }
  }
}
</script>

<style lang="sass" scoped></style>
