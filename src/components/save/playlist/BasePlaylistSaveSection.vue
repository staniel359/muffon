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
    model="playlist"
    scope="tracks"
    :error-collection="errorTracks"
    :success-collection-count="successTracksCount"
  />
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import BaseSaveCompleteSection from '../BaseSaveCompleteSection.vue'
import createPlaylistTrack from '@/helpers/actions/api/playlist/track/create'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'BasePlaylistSaveSection',
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
    },
    playlistId: {
      type: String,
      required: true
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
    createPlaylistTrack,
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

      await this.createPlaylistTrack(
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
        playlistId: this.playlistId,
        trackTitle: track.title,
        artistName: track.artist.name,
        albumTitle: track.album?.title,
        imageUrl: track.image?.large
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
