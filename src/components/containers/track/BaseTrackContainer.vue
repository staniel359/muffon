<template>
  <div
    :class="{ active: isActive }"
    @click="handleClick"
  >
    <slot
      :isLoading="isLoading"
      :isError="!!error"
      :isCurrent="isCurrent"
    ></slot>
  </div>
</template>

<script>
import fetchTrackData from '#/actions/player/track/fetchData'
import { getIsCurrentTrack as getIsPlayerCurrentTrack } from '#/actions/player'
import { toggleAction as toggleAudioAction } from '#/actions/audio'

export default {
  name: 'BaseTrackContainer',
  props: {
    trackData: {
      type: Object,
      required: true
    },
    queueTracks: {
      type: Array,
      default () {
        return []
      }
    },
    isWithActiveClass: Boolean
  },
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    isActive () {
      return (
        this.isWithActiveClass &&
          this.isCurrent
      )
    },
    isCurrent () {
      return getIsPlayerCurrentTrack({
        trackId: this.trackId
      })
    },
    trackId () {
      return this.trackData.id
    },
    trackDataArgs () {
      return {
        trackData: this.trackData,
        queueTracks: this.queueTracks
      }
    }
  },
  methods: {
    handleClick () {
      if (this.isCurrent) {
        toggleAudioAction()
      } else {
        !this.isLoading && this.fetchAudio()
      }
    },
    fetchTrackData,
    fetchAudio () {
      this.fetchTrackData(
        this.trackDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
