<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :active-text-key="activeTextKey"
    @complete="handleProgressComplete"
  />

  <CompleteSection
    v-if="isComplete"
    :total-count="totalCount"
    :error-tracks="errorTracks"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './TracksSection/CompleteSection.vue'
import createLibraryTrack from '*/helpers/actions/api/library/track/create'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default {
  name: 'TracksSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorTracks: this.setErrorTracks,
      retry: this.retry
    }
  },
  inject: [
    'setCollection'
  ],
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isComplete: false,
      isMounted: false,
      isProgress: true,
      errorTracks: [],
      activeTextKey: 'save.active.tracks'
    }
  },
  computed: {
    totalCount () {
      return this.tracks.length
    }
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  mounted () {
    this.isMounted = true

    this.saveTracks()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    createLibraryTrack,
    handleTracksChange () {
      this.resetProgress()

      this.saveTracks()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    retry () {
      this.isComplete = false
      this.isProgress = true

      this.setCollection(
        [
          ...this.errorTracks
        ]
      )

      this.errorTracks = []
    },
    async saveTracks () {
      this.setProgressTotalCount()

      for (const trackData of this.tracks) {
        if (this.isMounted) {
          await this.saveTrack(
            trackData
          )
        }
      }
    },
    async saveTrack (
      trackData
    ) {
      const trackFormatted =
        this.formatTrack(
          trackData
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorTracks.push(
            trackData
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.incrementProgress()
        }
      }

      await this.createLibraryTrack(
        trackFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatTrack (
      trackData
    ) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      return {
        trackTitle: trackData.title,
        artistName
      }
    },
    setErrorTracks (
      value
    ) {
      this.errorTracks = value
    },
    resetProgress () {
      this.$refs
        .progress
        .reset()
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.totalCount
        )
    },
    incrementProgress () {
      this.$refs
        .progress
        .increment()
    }
  }
}
</script>

<style lang="sass" scoped></style>
