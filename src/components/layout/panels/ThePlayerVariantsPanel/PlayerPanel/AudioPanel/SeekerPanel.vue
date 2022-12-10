<template>
  <BaseSeeker
    ref="seeker"
    :options="seekerOptions"
    :is-disabled="!isAudioPlayable"
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
  mainSeekerOptions
} from '@/helpers/data/plugins/semantic'
import {
  clone as cloneElement,
  addClass as addElementClass,
  setPercentWidth as setElementPercentWidth,
  insertAfter as insertElementAfter
} from '@/helpers/actions/plugins/jquery'

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
      progressBar: null,
      seekingAudioStatus: null,
      isSeeking: false,
      audioCurrentTime: 0
    }
  },
  computed: {
    ...mapState(
      'audio',
      {
        audioStatus: 'status',
        audioProgress: 'progress',
        audioDuration: 'duration',
        isAudioPlayable: 'isPlayable',
        audioElement: 'element'
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
      return (
        this.audioTimePercent === 100
      )
    },
    seekerMainTrack () {
      return this.$refs
        .seeker
        .$el
        .firstChild
        .firstChild
    },
    isEndAudio () {
      return (
        this.isAudioEnded &&
          !this.isSeeking
      )
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
      handler: 'handleIsAudioEndedChange'
    }
  },
  mounted () {
    this.audioElement.ontimeupdate =
      this.handleAudioTimeUpdate

    this.setProgressBar()
  },
  methods: {
    handleAudioTimeUpdate (
      event
    ) {
      const {
        currentTime
      } = event.target

      this.audioCurrentTime = currentTime
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
    async handleAudioTimePercentChange (
      value
    ) {
      await this.$nextTick()

      if (!this.isSeeking) {
        this.setSeekerValue(
          value
        )
      }
    },
    handleIsAudioEndedChange () {
      if (this.isEndAudio) {
        this.endAudio()
      }
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
    },
    setSeekerValue (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
