<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getTrack from '@/helpers/actions/api/track/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseTrackSimilarPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      trackData: null,
      scope: 'similar'
    }
  },
  computed: {
    trackArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.limitComputed
      }
    },
    tracksData () {
      return this.trackData
    }
  },
  methods: {
    getTrack,
    getTracksData () {
      return this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
