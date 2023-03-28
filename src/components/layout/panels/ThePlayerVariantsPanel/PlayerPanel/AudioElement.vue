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
import {
  mapState,
  mapActions
} from 'pinia'
import audioStore from '@/stores/audio'
import playerStore from '@/stores/player'
import {
  decrypt as decryptAudioFile
} from '@/helpers/actions/audioFile'

export default {
  name: 'AudioElement',
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioAutoplay: 'isAutoplay'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    )
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
      audioStore,
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
    async loadAudio () {
      this.$refs.audio.src =
        await this.getAudioLink()

      this.$refs
        .audio
        .load()
    },
    getAudioLink () {
      const {
        local,
        link
      } = this.playerPlaying.audio

      if (local) {
        return this.getLocalLink()
      } else {
        return link
      }
    },
    getLocalLink () {
      const {
        path,
        key,
        iv
      } = this.playerPlaying.audio.local

      return decryptAudioFile(
        {
          filePath: path,
          key,
          iv
        }
      )
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
