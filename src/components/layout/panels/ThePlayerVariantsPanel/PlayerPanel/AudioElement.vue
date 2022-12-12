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
  />
</template>

<script>
import fs from 'fs'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  decrypt as decryptFile
} from '@/helpers/actions/file'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState(
      'audio',
      {
        isAudioAutoplay: 'isAutoplay'
      }
    ),
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
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
    loadAudio () {
      this.$refs
        .audio
        .src = this.audioLink

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

<style lang="sass" scoped>
.audio-element
  @extend .d-none
</style>
