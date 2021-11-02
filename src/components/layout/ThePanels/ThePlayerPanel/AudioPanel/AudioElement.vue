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
import { updateStore } from '#/actions'

export default {
  name: 'AudioElement',
  data () {
    return {
      isToScrobble: false
    }
  },
  computed: {
    ...mapState('audio', {
      audioElement: 'element',
      audioStatus: 'status',
      isAudioAutoplay: 'isAutoplay'
    }),
    ...mapState('player', {
      isPlayerScrobbling: 'isScrobbling',
      playerPlaying: 'playing',
      playerScrobblePercent: 'scrobblePercent'
    })
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isToScrobble: 'handleIsToScrobbleChange'
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
      const { currentTime } = event.target

      this.setAudioCurrentTime(
        currentTime
      )

      if (this.isPlayerScrobbling) {
        const { duration } = event.target

        const isToScrobble = (
          currentTime * 100 / duration >=
            this.playerScrobblePercent
        )

        this.isToScrobble = isToScrobble
      }
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
    handleIsToScrobbleChange (value) {
      if (!value) {
        updateStore({
          'player.isScrobbled': false
        })
      }

      updateStore({
        'player.isToScrobble': value
      })
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
