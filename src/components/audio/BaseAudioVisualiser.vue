<template>
  <canvas
    ref="canvas"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'

export default {
  name: 'BaseAudioVisualiser',
  data () {
    return {
      animationFrame: null,
      canvasHeight: 256,
      fftSize: 512,
      barWidth: 1,
      barGapWidth: 1,
      colorPale: '#b589d6',
      colorBase: '#804fb3'
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        audioSource: 'source',
        audioStatus: 'status'
      }
    ),
    canvasWidth () {
      return this.barsCount * (
        this.barWidth +
          this.barGapWidth
      )
    },
    barsCount () {
      return this.fftSize / 2
    },
    canvasContext () {
      return this.$refs
        .canvas
        .getContext(
          '2d'
        )
    },
    analyser () {
      return this.audioContext
        .createAnalyser()
    },
    barsArray () {
      return new Uint8Array(
        this.barsCount
      )
    }
  },
  watch: {
    audioStatus: {
      immediate: true,
      handler:
        'handleAudioStatusChange'
    }
  },
  mounted () {
    this.setCanvasData()

    this.setCanvasContextData()

    this.setAudioSourceConnection()

    this.setAnalyserData()
  },
  unmounted () {
    this.stopAnimation()
  },
  methods: {
    handleAudioStatusChange (
      value
    ) {
      if (value === 'play') {
        this.setAnimation()
      } else {
        this.stopAnimation()
      }
    },
    handleRequestAnimationFrame () {
      this.setFrame()

      this.setAnimation()
    },
    setCanvasData () {
      this.$refs.canvas.width =
        this.canvasWidth

      this.$refs.canvas.height =
        this.canvasHeight
    },
    setCanvasContextData () {
      const gradient =
        this.canvasContext
          .createLinearGradient(
            0,
            0,
            0,
            this.canvasHeight
          )

      gradient.addColorStop(
        0,
        this.colorPale
      )

      gradient.addColorStop(
        1,
        this.colorBase
      )

      this.canvasContext.fillStyle =
        gradient
    },
    setAudioSourceConnection () {
      this.audioSource.connect(
        this.analyser
      )
    },
    setAnalyserData () {
      this.analyser.fftSize =
        this.fftSize
    },
    setAnimation () {
      this.animationFrame =
        requestAnimationFrame(
          this.handleRequestAnimationFrame
        )
    },
    setFrame () {
      this.clearCanvas()

      this.setFrequencyData()

      this.setBars()
    },
    clearCanvas () {
      this.canvasContext
        .clearRect(
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        )
    },
    setFrequencyData () {
      this.analyser
        .getByteFrequencyData(
          this.barsArray
        )
    },
    setBars () {
      this.barsArray.forEach(
        this.setBar
      )
    },
    setBar (
      value,
      index
    ) {
      const x =
        this.getBarStartX(
          index
        )

      const y =
        this.getBarStartY(
          value
        )

      return this.canvasContext
        .fillRect(
          x,
          y,
          this.barWidth,
          value
        )
    },
    getBarStartX (
      index
    ) {
      return index * (
        this.barWidth +
          this.barGapWidth
      )
    },
    getBarStartY (
      value
    ) {
      return (
        this.canvasHeight - value
      )
    },
    stopAnimation () {
      cancelAnimationFrame(
        this.animationFrame
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
