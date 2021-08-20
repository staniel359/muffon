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
import { mapState, mapGetters } from 'vuex'
import fetchTrackData from '#/actions/player/track/fetchData'
import { setGlobalData, setPlayerPlaying } from '#/actions'

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
    ...mapState('player', {
      playerCurrentTrackId: 'currentTrackId'
    }),
    ...mapState('audio', {
      audioElement: 'element'
    }),
    ...mapGetters('audio', {
      audioAction: 'action'
    }),
    isActive () {
      return (
        this.isWithActiveClass &&
          this.isCurrent
      )
    },
    isCurrent () {
      return (
        this.trackId ===
          this.playerCurrentTrackId
      )
    },
    trackId () {
      return this.trackData.player_id
    },
    trackDataArgs () {
      return {
        trackData: this.trackData,
        queueTracks: this.queueTracks
      }
    },
    trackAudioLink () {
      return this.trackData.audio?.link
    }
  },
  methods: {
    handleClick () {
      if (this.isCurrent) {
        this.callAudioAction()
      } else if (this.trackAudioLink) {
        this.setAudio()
      } else if (!this.isLoading) {
        this.fetchAudio()
      }
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    },
    setAudio () {
      setGlobalData({
        'player.currentTrackId': this.trackId,
        'player.variants': [],
        'queue.tracks': this.queueTracks
      })

      setPlayerPlaying(
        this.trackData
      )
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
