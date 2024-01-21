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
import hotkeys from 'hotkeys-js'
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  main as mainSeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'
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
      audioStore,
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
    },
    seekingAudioStatusComputed () {
      if (this.isStop) {
        return 'pause'
      } else {
        return this.audioStatus
      }
    },
    isStop () {
      return (
        this.audioStatus === 'stop'
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
    this.audioElement
      .addEventListener(
        'timeupdate',
        this.handleAudioTimeUpdate
      )

    this.setProgressBar()

    this.bindKeys()
  },
  beforeUnmount () {
    this.unbindKeys()
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
          this.seekingAudioStatus =
            this.seekingAudioStatusComputed
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
    handleForwardMediumKeysPress () {
      this.setAudioCurrentTime(
        this.audioCurrentTime + 10
      )
    },
    handleBackwardMediumKeysPress () {
      this.setAudioCurrentTime(
        this.audioCurrentTime - 10
      )
    },
    bindKeys () {
      hotkeys(
        'ctrl+right, command+right',
        this.handleForwardMediumKeysPress
      )

      hotkeys(
        'ctrl+left, command+left',
        this.handleBackwardMediumKeysPress
      )
    },
    unbindKeys () {
      hotkeys.unbind(
        'ctrl+right, command+right, ctrl+left, command+left'
      )
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

      this.audioCurrentTime = value
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
