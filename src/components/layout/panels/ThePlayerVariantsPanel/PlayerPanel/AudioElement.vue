<template>
  <audio
    ref="audio"
    class="d-none"
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
import {
  mapState,
  mapActions
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        audioSource: 'source',
        isAudioAutoplay: 'isAutoplay',
        isAudioEqualizerEnabled: 'isEqualizerEnabled'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    audioLink () {
      return this.playerPlaying.audio.link
    },
    audioOutput () {
      return this.audioContext.destination
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isAudioEqualizerEnabled:
      'handleIsAudioEqualizerEnabledChange'
  },
  mounted () {
    this.setAudioElement(
      this.$refs.audio
    )

    this.setAudioContextData()

    this.setAudioSourceData()

    if (!this.isAudioEqualizerEnabled) {
      this.setAudioSourceConnection()
    }
  },
  methods: {
    ...mapActions(
      audioStore,
      {
        setAudioElement: 'setElement',
        setAudioContext: 'setContext',
        setAudioSource: 'setSource',
        setAudioDuration: 'setDuration',
        setAudioProgress: 'setProgress',
        setIsAudioLoop: 'setIsLoop',
        setIsAudioPlayable: 'setIsPlayable',
        setAudioStatus: 'setStatus',
        setAudioCurrentTime: 'setCurrentTime',
        setAudioVolume: 'setVolume'
      }
    ),
    async handlePlayerPlayingChange (
      value
    ) {
      await this.$nextTick()

      if (value) {
        this.loadAudio()
      } else {
        this.stopAudio()
      }

      this.setIsAudioLoop(
        false
      )
    },
    handleIsAudioEqualizerEnabledChange (
      value
    ) {
      if (value) {
        this.resetAudioSourceConnection()
      } else {
        this.setAudioSourceConnection()
      }
    },
    handleLoadStart () {
      this.setIsAudioPlayable(
        false
      )

      this.setAudioDuration(
        0
      )

      this.setAudioProgress(
        0
      )
    },
    handleDurationChange (
      event
    ) {
      const {
        duration
      } = event.target

      this.setAudioDuration(
        duration
      )

      this.setProgress(
        event
      )
    },
    handleProgress (
      event
    ) {
      this.setProgress(
        event
      )
    },
    handleCanPlay () {
      this.setIsAudioPlayable(
        true
      )
    },
    handlePlay () {
      this.setAudioStatus(
        'play'
      )
    },
    handleTimeUpdate (
      event
    ) {
      const {
        currentTime
      } = event.target

      this.setAudioCurrentTime(
        currentTime
      )
    },
    handlePause () {
      this.setAudioStatus(
        'pause'
      )
    },
    handleVolumeChange (
      event
    ) {
      const {
        volume
      } = event.target

      this.setAudioVolume(
        volume
      )
    },
    handleEmptied () {
      this.setIsAudioPlayable(
        false
      )
    },
    setAudioContextData () {
      if (!this.audioContext) {
        const context =
          new AudioContext()

        this.setAudioContext(
          context
        )
      }
    },
    setAudioSourceData () {
      if (!this.audioSource) {
        const source =
          this.audioContext
            .createMediaElementSource(
              this.$refs.audio
            )

        this.setAudioSource(
          source
        )
      }
    },
    setAudioSourceConnection () {
      this.audioSource.connect(
        this.audioOutput
      )
    },
    resetAudioSourceConnection () {
      this.audioSource.disconnect(
        this.audioOutput
      )
    },
    loadAudio () {
      this.$refs.audio.src =
        this.audioLink

      this.$refs
        .audio
        .load()
    },
    stopAudio () {
      this.setAudioStatus(
        'stop'
      )

      this.$refs
        .audio
        .src = ''
    },
    setProgress (
      event
    ) {
      const {
        buffered
      } = event.target

      if (buffered.length) {
        const progress =
          buffered.end(
            buffered.length - 1
          )

        this.setAudioProgress(
          progress
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
