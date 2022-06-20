<template>
  <audio
    ref="audio"
    class="audio-element"
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
import fs from 'fs'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  decrypt as decryptFile
} from '*/helpers/actions/file'

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
    ...mapState(
      'audio',
      {
        audioElement: 'element',
        audioStatus: 'status',
        isAudioAutoplay: 'isAutoplay',
        audioDuration: 'duration',
        audioCurrentTime: 'currentTime'
      }
    ),
    ...mapState(
      'player',
      {
        isPlayerWithScrobbling: 'isWithScrobbling',
        playerPlaying: 'playing',
        playerScrobblePercent: 'scrobblePercent'
      }
    ),
    isToScrobble () {
      return (
        this.playerPlaying &&
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
    },
    audioLink () {
      const {
        local,
        link
      } = this.playerPlaying.audio

      if (local) {
        return this.filePath
      } else {
        return link
      }
    },
    filePath () {
      if (this.isFileExist) {
        return this.fileLink
      } else {
        return ''
      }
    },
    isFileExist () {
      const {
        path
      } = this.playerPlaying.audio.local

      return fs.existsSync(
        path
      )
    },
    fileLink () {
      const {
        path,
        key,
        iv
      } = this.playerPlaying.audio.local

      return decryptFile(
        {
          filePath: path,
          key,
          iv
        }
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
    ...mapActions(
      'audio',
      {
        setAudioElement: 'setElement',
        setAudioDuration: 'setDuration',
        setAudioProgress: 'setProgress',
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

      if (this.isPlayerWithScrobbling) {
        updateGlobalStore(
          {
            'player.isScrobbling': true
          },
          {
            isSave: false
          }
        )
      }
    },
    async handleTimeUpdate (
      event
    ) {
      const {
        currentTime
      } = event.target

      this.setAudioCurrentTime(
        currentTime
      )

      if (currentTime === 0) {
        this.isScrobbled = false

        updateGlobalStore(
          {
            'player.isScrobbled': false,
            'player.isScrobbling': false
          },
          {
            isSave: false
          }
        )
      }

      this.currentPercent =
        await this.getCurrentPercent()
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
    handleSeeking () {
      this.updateScrobblePercent()
    },
    handlePlayerScrobblePercentChange () {
      this.updateScrobblePercent()
    },
    handleIsToScrobbleChange (
      value
    ) {
      if (value) {
        this.isScrobbled = true
      }
    },
    handleIsScrobbledChange (
      value
    ) {
      updateGlobalStore(
        {
          'player.isToScrobble': value
        },
        {
          isSave: false
        }
      )
    },
    handleIsPlayerWithScrobblingChange (
      value
    ) {
      if (!value) {
        updateGlobalStore(
          {
            'player.isScrobbling': false
          },
          {
            isSave: false
          }
        )
      }
    },
    loadAudio () {
      this.setAudioStatus(
        'pause'
      )

      this.audioElement.src = this.audioLink

      this.audioElement.load()
    },
    stopAudio () {
      this.setAudioStatus(
        'stop'
      )

      this.audioElement.src = ''

      updateGlobalStore(
        {
          'player.isScrobbling': false
        },
        {
          isSave: false
        }
      )
    },
    async updateScrobblePercent () {
      const currentPercent =
        await this.getCurrentPercent()

      this.scrobblePercent =
        this.playerScrobblePercent +
          currentPercent

      this.currentPercent = currentPercent
    },
    async getCurrentPercent () {
      await this.$nextTick()

      if (this.audioDuration === 0) {
        return 0
      } else {
        const {
          currentTime
        } = this.$refs.audio

        return (
          currentTime * 100 /
          this.audioDuration
        )
      }
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

<style lang="sass" scoped>
.audio-element
  @extend .d-none
</style>
