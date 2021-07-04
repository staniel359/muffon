<template>
  <audio
    class="audio-element"
    ref="audio"
    crossorigin="anonymous"
    controls
    :autoplay="isAudioAutoplay"
    @loadstart="handleLoadStart"
    @durationchange="handleDurationChange"
    @progress="handleProgress"
    @canplay="handleCanPlay"
    @play="handlePlay"
    @timeupdate="handleTimeUpdate"
    @pause="handlePause"
    @volumechange="handleVolumeChange"
    @emptied="handleEmptied"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState('audio', {
      audioElement: 'element',
      audioStatus: 'status',
      isAudioAutoplay: 'isAutoplay'
    }),
    ...mapState('player', {
      playerPlaying: 'playing'
    })
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    }
  },
  mounted () {
    this.setAudioElement(
      this.$refs.audio
    )
  },
  methods: {
    ...mapActions('audio', {
      setAudioElement: 'setElement',
      setAudioDuration: 'setDuration',
      setAudioProgress: 'setProgress',
      setIsAudioPlayable: 'setIsPlayable',
      setAudioStatus: 'setStatus',
      setAudioCurrentTime: 'setCurrentTime',
      setAudioVolume: 'setVolume'
    }),
    handlePlayerPlayingChange (value) {
      this.$nextTick(() => {
        if (value) {
          this.loadAudio()
        } else {
          this.stopAudio()
        }
      })
    },
    handleLoadStart () {
      this.setIsAudioPlayable(false)

      this.setAudioDuration(0)
      this.setAudioProgress(0)
    },
    handleDurationChange (event) {
      this.setAudioDuration(
        event.target.duration
      )
    },
    handleProgress (event) {
      const { buffered } = event.target

      if (buffered.length) {
        this.setAudioProgress(
          buffered.end(0)
        )
      }
    },
    handleCanPlay () {
      this.setIsAudioPlayable(true)
    },
    handlePlay () {
      this.setAudioStatus('play')
    },
    handleTimeUpdate (event) {
      this.setAudioCurrentTime(
        event.target.currentTime
      )
    },
    handlePause () {
      this.setAudioStatus('pause')
    },
    handleVolumeChange (event) {
      this.setAudioVolume(
        event.target.volume
      )
    },
    handleEmptied () {
      this.setIsAudioPlayable(false)
    },
    loadAudio () {
      this.setAudioStatus('pause')

      this.audioElement.src =
        this.playerPlaying.audio.link

      this.audioElement.load()
    },
    stopAudio () {
      this.setAudioStatus('stop')

      this.audioElement.src = null
    }
  }
}
</script>

<style lang="sass" scoped>
.audio-element
  @extend .d-none
</style>
