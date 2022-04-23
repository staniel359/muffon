<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :status="status"
    :scope="scope"
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
import CompleteSection from './SaveSection/CompleteSection.vue'
import createPlaylistTrack from '*/helpers/actions/api/playlist/track/create'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default {
  name: 'SaveSection',
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
    'setTracks'
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
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
      status: 'save',
      scope: 'tracks'
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
    createPlaylistTrack,
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

      this.setTracks(
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
      const createArgs =
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

      await this.createPlaylistTrack(
        createArgs
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
        playlistId: this.playlistId,
        trackTitle: trackData.title,
        artistName
      }
    },
    setErrorTracks (
      value
    ) {
      this.errorTracks = value
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
    },
    resetProgress () {
      this.$refs
        .progress
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
