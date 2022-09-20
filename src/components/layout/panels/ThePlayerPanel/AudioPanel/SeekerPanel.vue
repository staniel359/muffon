<template>
  <BaseSeeker
    :key="key"
    :options="seekerOptions"
    :is-disabled="!isAudioPlayable"
    @init="handleSeekerInit"
    @mouse-down="handleMouseDown"
    @change="handleChange"
    @move="handleMove"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  setSeekerValue
} from '@/helpers/actions/plugins/semantic'
import {
  mainSeekerOptions
} from '@/helpers/data/plugins/semantic'
import {
  clone as cloneElement,
  addClass as addElementClass,
  setPercentWidth as setElementPercentWidth,
  insertAfter as insertElementAfter
} from '@/helpers/actions/plugins/jquery'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'SeekerPanel',
  components: {
    BaseSeeker
  },
  emits: [
    'audioEnd'
  ],
  data () {
    return {
      seeker: null,
      progressBar: null,
      seekingAudioStatus: null,
      key: null,
      isSeeking: false
    }
  },
  computed: {
    ...mapState(
      'audio',
      {
        audioStatus: 'status',
        audioProgress: 'progress',
        audioCurrentTime: 'currentTime',
        audioDuration: 'duration',
        isAudioPlayable: 'isPlayable',
        audioElement: 'element'
      }
    ),
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    seekerOptions () {
      return mainSeekerOptions()
    },
    audioProgressPercent () {
      return this.secondsToPercent(
        this.audioProgress
      )
    },
    audioTimePercent () {
      return this.secondsToPercent(
        this.audioCurrentTime
      )
    },
    isAudioEnded () {
      return this.audioTimePercent === 100
    },
    seekerMainTrack () {
      return this.seeker.firstChild.firstChild
    }
  },
  watch: {
    audioProgressPercent: {
      immediate: true,
      handler: 'handleAudioProgressPercentChange'
    },
    audioTimePercent: {
      immediate: true,
      handler: 'handleAudioTimePercentChange'
    },
    isAudioEnded: {
      immediate: true,
      handler: 'handleAudioEnd'
    },
    playerPlaying: 'handlePlayerPlayingChange'
  },
  methods: {
    handleSeekerInit (
      element
    ) {
      this.seeker = element

      this.setProgressBar()
    },
    handleMouseDown (
      event
    ) {
      if (this.isAudioPlayable) {
        this.isSeeking = true

        if (!this.isAudioEnded) {
          this.seekingAudioStatus = this.audioStatus
        }

        this.audioElement.pause()
      }
    },
    handleMove (
      value
    ) {
      if (this.isSeeking) {
        const time =
          this.percentToSeconds(
            value
          )

        this.setAudioCurrentTime(
          time
        )
      }
    },
    handleChange (
      value
    ) {
      if (this.isSeeking) {
        const time =
          this.percentToSeconds(
            value
          )

        this.setAudioCurrentTime(
          time
        )

        if (this.isAudioEnded) {
          this.endAudio()
        } else {
          this.callAudioAction()
        }

        this.isSeeking = false
      }
    },
    handleAudioProgressPercentChange (
      value
    ) {
      if (this.progressBar) {
        setElementPercentWidth(
          this.progressBar,
          value
        )
      }
    },
    handleAudioTimePercentChange (
      value
    ) {
      if (!this.isSeeking) {
        setSeekerValue(
          this.seeker,
          value
        )
      }
    },
    handleAudioEnd (
      value
    ) {
      if (value && !this.isSeeking) {
        this.endAudio()
      }
    },
    handlePlayerPlayingChange () {
      this.key = generateKey()
    },
    endAudio () {
      this.$emit(
        'audioEnd'
      )
    },
    callAudioAction () {
      this.audioElement[
        this.seekingAudioStatus
      ]()
    },
    setProgressBar () {
      const progressBar =
        cloneElement(
          this.seekerMainTrack
        )

      addElementClass(
        progressBar,
        'track-progress'
      )

      setElementPercentWidth(
        progressBar,
        0
      )

      insertElementAfter(
        this.seekerMainTrack,
        progressBar
      )

      this.progressBar = progressBar
    },
    secondsToPercent (
      seconds
    ) {
      if (this.audioDuration) {
        return (
          seconds / this.audioDuration * 100
        )
      } else {
        return 0
      }
    },
    percentToSeconds (
      percent
    ) {
      return (
        this.audioDuration * percent / 100
      )
    },
    setAudioCurrentTime (
      value
    ) {
      this.audioElement.currentTime = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
