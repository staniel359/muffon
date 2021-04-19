<template>
  <audio
    class="audio"
    ref="audio"
    crossorigin="anonymous"
    autoplay
    controls
    @loadstart="handleLoadStart"
    @durationchange="handleDurationChange"
    @canplay="handleCanPlay"
    @progress="handleProgress"
    @play="handlePlay"
    @timeupdate="handleTimeUpdate"
    @pause="handlePause"
    @volumechange="handleVolumeChange"
    @emptied="handleEmptied"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AudioElement',
  mounted () {
    this.setAudioElement(this.$refs.audio)
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
    handleLoadStart () {
      this.setAudioDuration(0)
      this.setAudioProgress(0)
    },
    handleDurationChange (event) {
      this.setAudioDuration(
        event.target.duration
      )
    },
    handleCanPlay () {
      this.setIsAudioPlayable(true)
    },
    handleProgress (event) {
      const { buffered } = event.target

      buffered.length && this.setAudioProgress(
        buffered.end(0)
      )
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
    }
  }
}
</script>

<style lang="sass" scoped>
.audio
  @extend .d-none
</style>
