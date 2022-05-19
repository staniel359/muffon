<template>
  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="save"
    scope="tracks"
    @complete="handleProgressComplete"
  />
  <BaseSaveCompleteSection
    v-else
    model="library"
    scope="tracks"
    :error-collection="errorTracks"
    :success-collection-count="successTracksCount"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import BaseSaveCompleteSection from '../../BaseSaveCompleteSection.vue'
import createLibraryTrack from '*/helpers/actions/api/library/track/create'
import collectionMixin from '*/mixins/collectionMixin'

export default {
  name: 'TracksSection',
  components: {
    BaseProgress,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isProgress: true,
      isComplete: false,
      successTracks: [],
      errorTracks: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    tracksCount () {
      return this.tracks.length
    },
    successTracksCount () {
      return this.successTracks.length
    }
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  mounted () {
    this.processTracks()
  },
  methods: {
    createLibraryTrack,
    async handleTracksChange () {
      this.isProgress = true
      this.isComplete = false

      this.errorTracks = []

      await this.$nextTick()

      this.processTracks()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processTracks () {
      this.setProgressTotalCount()

      await this.saveTracks()

      this.isComplete = true
    },
    async saveTracks () {
      for (
        const track of this.tracks
      ) {
        await this.saveTrack(
          track
        )
      }
    },
    async saveTrack (
      track
    ) {
      const trackFormatted =
        this.formatTrack(
          track
        )

      const handleSuccess = () => {
        this.addCollectionItem(
          {
            collection: 'successTracks',
            item: track
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorTracks',
            item: track
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.createLibraryTrack(
        trackFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatTrack (
      track
    ) {
      return {
        trackTitle: track.title,
        artistName: track.artist.name,
        albumTitle: track.album?.title,
        image: track.image?.large,
        created: track.created
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.tracksCount
        )
    },
    incrementProgress () {
      this.$refs
        .progress
        ?.increment()
    }
  }
}
</script>

<style lang="sass" scoped></style>
