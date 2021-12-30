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
    @seeking="handleSeeking"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { updateStore } from '#/actions'

export default {
  name: 'AudioElement',
  data () {
    return {
      currentPercent: 0,
      scrobblePercent: null,
      isScrobbled: false
    }
  },
  computed: {
    ...mapState('audio', {
      audioElement: 'element',
      audioStatus: 'status',
      isAudioAutoplay: 'isAutoplay',
      audioDuration: 'duration',
      audioCurrentTime: 'currentTime'
    }),
    ...mapState('player', {
      isPlayerWithScrobbling: 'isWithScrobbling',
      playerPlaying: 'playing',
      playerScrobblePercent: 'scrobblePercent'
    }),
    isToScrobble () {
      return (
        this.isPlayerWithScrobbling &&
          !this.isScrobbled &&
          this.isPastScrobblePercent
      )
    },
    isPastScrobblePercent () {
      return (
        this.currentPercent >=
          this.scrobblePercent
      )
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    playerScrobblePercent: {
      immediate: true,
      handler: 'handlePlayerScrobblePercentChange'
    },
    isToScrobble: 'handleIsToScrobbleChange',
    isScrobbled: {
      immediate: true,
      handler: 'handleIsScrobbledChange'
    },
    isPlayerWithScrobbling: {
      immediate: true,
      handler: 'handleIsPlayerWithScrobblingChange'
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
      const { duration } = event.target

      this.setAudioDuration(
        duration
      )

      this.setProgress(event)
    },
    handleProgress (event) {
      this.setProgress(event)
    },
    handleCanPlay () {
      this.setIsAudioPlayable(true)
    },
    handlePlay () {
      this.setAudioStatus('play')

      if (this.isPlayerWithScrobbling) {
        updateStore({
          'player.isScrobbling': true
        })
      }
    },
    handleTimeUpdate (event) {
      const { currentTime } = event.target

      this.setAudioCurrentTime(
        currentTime
      )

      if (currentTime === 0) {
        this.isScrobbled = false

        updateStore({
          'player.isScrobbled': false,
          'player.isScrobbling': false
        })
      }

      this.currentPercent =
        this.getCurrentPercent()
    },
    handlePause () {
      this.setAudioStatus('pause')
    },
    handleVolumeChange (event) {
      const { volume } = event.target

      this.setAudioVolume(
        volume
      )
    },
    handleEmptied () {
      this.setIsAudioPlayable(false)
    },
    handleSeeking () {
      this.updateScrobblePercent()
    },
    handlePlayerScrobblePercentChange () {
      this.updateScrobblePercent()
    },
    handleIsToScrobbleChange (value) {
      if (value) {
        this.isScrobbled = true
      }
    },
    handleIsScrobbledChange (value) {
      updateStore({
        'player.isToScrobble': value
      })
    },
    handleIsPlayerWithScrobblingChange (value) {
      if (!value) {
        updateStore({
          'player.isScrobbling': false
        })
      }
    },
    loadAudio () {
      this.setAudioStatus('pause')

      this.audioElement.src =
        this.playerPlaying.audio.link

      this.audioElement.load()
    },
    stopAudio () {
      this.setAudioStatus('stop')

      this.audioElement.src = ''

      updateStore({
        'player.isScrobbling': false
      })
    },
    updateScrobblePercent () {
      const currentPercent =
        this.getCurrentPercent()

      this.scrobblePercent =
        this.playerScrobblePercent +
          currentPercent

      this.currentPercent = currentPercent
    },
    getCurrentPercent () {
      this.$nextTick(() => {
        if (this.audioDuration === 0) {
          return 0
        } else {
          const { currentTime } = this.$refs.audio

          return (
            currentTime * 100 /
              this.audioDuration
          )
        }
      })
    },
    setProgress (event) {
      const { buffered } = event.target

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

<style lang="sass" scoped>
.audio-element
  @extend .d-none
</style>
