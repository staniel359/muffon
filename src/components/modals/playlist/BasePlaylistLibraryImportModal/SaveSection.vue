<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :formatActive="formatProgressActive"
    @complete="handleProgressComplete"
  />

  <CompleteSection
    v-if="isComplete"
    :isError="isError"
    :totalCount="totalCount"
    :errorTracks="errorTracks"
    @retry="handleRetry"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './SaveSection/CompleteSection.vue'
import createPlaylistTrack from '*/helpers/actions/api/playlist/track/create'

export default {
  name: 'SaveSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorTracks: this.setErrorTracks
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
      isError: false,
      isMounted: false,
      isProgress: true,
      errorTracks: []
    }
  },
  computed: {
    totalCount () {
      return this.tracks.length
    }
  },
  mounted () {
    this.isMounted = true

    this.saveTracks()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  methods: {
    handleTracksChange () {
      this.$refs.progress.reset()

      this.saveTracks()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    handleRetry () {
      this.isComplete = false
      this.isError = false
      this.isProgress = true

      this.setTracks(
        [...this.errorTracks]
      )

      this.errorTracks = []
    },
    createPlaylistTrack,
    formatProgressActive ({ value, total }) {
      return this.$t(
        'save.active.tracks',
        { value, total }
      )
    },
    async saveTracks () {
      this.$refs.progress.setTotalCount(
        this.totalCount
      )

      for (const trackData of this.tracks) {
        if (this.isMounted) {
          await this.saveTrack(
            trackData
          )
        }
      }
    },
    async saveTrack (trackData) {
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
          this.$refs.progress.increment()
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
    formatTrack (trackData) {
      return {
        playlistId: this.playlistId,
        trackTitle: trackData.title,
        artistName: trackData.artist.name,
        albumTitle: trackData.album?.title,
        imageUrl: trackData.image?.original
      }
    },
    setErrorTracks (value) {
      this.errorTracks = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
