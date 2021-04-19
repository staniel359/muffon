<template>
  <audio
    class="audio-element"
    ref="audio"
    crossorigin="anonymous"
    controls
    :autoplay="isAudioAutoplay"
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
import { mapState, mapActions } from 'vuex'
import { load as loadAudio } from '#/actions/audio'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    ...mapState('audio', {
      isAudioAutoplay: 'isAutoplay'
    })
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange'
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
      value && loadAudio(
        this.playerPlaying.audio.link
      )
    },
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
.audio-element
  @extend .d-none
</style>
