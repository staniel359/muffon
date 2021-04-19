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
import trackPlayableMixin from '#/mixins/trackPlayable'
import fetchTrackData from '#/actions/player/track/fetchData'
import { getIsCurrentTrack as getIsPlayerCurrentTrack } from '#/actions/player'

export default {
  name: 'BaseTrackContainer',
  mixins: [
    trackPlayableMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isWithActiveClass: Boolean
  },
  emits: [
    'loadEnd'
  ],
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
      return { trackData: this.trackData }
    }
  },
  methods: {
    handleLoadEnd () {
      this.$emit('loadEnd')
    },
    fetchTrackData,
    fetchAudio () {
      this.fetchTrackData(this.trackDataArgs)
        .then(this.handleLoadEnd)
    }
  }
}
</script>

<style lang="sass" scoped></style>
