<template>
  <audio
    ref="audio"
    class="d-none"
    crossorigin="anonymous"
    controls
    :autoplay="isAudioAutoplay"
    @loadstart="handleLoadStart"
    @durationchange="handleDurationChange"
    @loadeddata="handleLoadedData"
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
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState(
      audioStore,
      {
        audioContext: 'context',
        audioSource: 'source',
        isAudioAutoplay: 'isAutoplay',
        isAudioEqualizerEnabled: 'isEqualizerEnabled',
        isAudioLoop: 'isLoop',
        isAudioMuted: 'isMuted'
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
    isAudioLoop: {
      immediate: true,
      handler: 'handleIsAudioLoopChange'
    },
    isAudioMuted: {
      immediate: true,
      handler: 'handleIsAudioMutedChange'
    },
    playerPlaying:
      'handlePlayerPlayingChange',
    isAudioEqualizerEnabled:
      'handleIsAudioEqualizerEnabledChange'
  },
  mounted () {
    this.setAudioElement(
      this.$refs.audio
    )

    if (this.playerPlaying) {
      this.loadAudio()
    }

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
        setAudioVolume: 'setVolume',
        setIsAudioStartedLoading: 'setIsStartedLoading'
      }
    ),
    handlePlayerPlayingChange (
      value
    ) {
      this.setIsAudioStartedLoading(
        false
      )

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
    handleLoadedData () {
      this.setIsAudioStartedLoading(
        true
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
      this.setAudioStatusWithGlobal(
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
      this.setAudioStatusWithGlobal(
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
    async handleIsAudioLoopChange (
      value
    ) {
      await this.$nextTick()

      this.$refs
        .audio
        .loop = value
    },
    async handleIsAudioMutedChange (
      value
    ) {
      await this.$nextTick()

      this.$refs
        .audio
        .muted = value
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
      this.setAudioStatusWithGlobal(
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
    },
    setAudioStatusWithGlobal (
      value
    ) {
      this.setAudioStatus(
        value
      )

      updateGlobalStore(
        {
          'audio.status': value
        },
        {
          isSave: false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
