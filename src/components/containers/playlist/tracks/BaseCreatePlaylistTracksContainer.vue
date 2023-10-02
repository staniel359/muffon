<template>
  <div
    class="item"
    :class="{
      disabled: isLoading
    }"
    @click="handleClick"
  >
    <slot
      :is-loading="isLoading"
    />

    <BaseProgress
      v-if="isShowProgress"
      ref="progress"
      class="progress"
      status="save"
      scope="tracks"
      @complete="handleProgressComplete"
    />

    <div
      v-if="error"
      class="main-top-section main-bottom-section"
    >
      <BaseErrorMessage
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import createPlaylistTrack from '@/helpers/actions/api/playlist/track/create'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'BaseCreatePlaylistTracksContainer',
  components: {
    BaseProgress,
    BaseErrorMessage
  },
  mixins: [
    collectionMixin
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
    tracks: {
      type: Array,
      required: true
    },
    paginationItem: {
      type: Object,
      required: true
    }
  },
  emits: [
    'success',
    'error'
  ],
  data () {
    return {
      error: null,
      isProgress: false,
      isComplete: true,
      isLoading: false,
      errorTracks: [],
      playlistTrackIds: []
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
    }
  },
  mounted () {
    this.tracksToCreate = this.tracks
  },
  methods: {
    createPlaylistTrack,
    handleClick () {
      this.processTracks()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processTracks () {
      this.isProgress = true
      this.isComplete = false

      this.errorTracks = []

      await this.$nextTick()

      this.setProgressTotalCount()

      await this.createTracks()

      this.isComplete = true

      if (this.errorTracks.length) {
        this.tracksToCreate = this.errorTracks

        this.$emit(
          'error'
        )
      } else {
        this.$emit(
          'success',
          this.playlistTrackIds
        )
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.tracksCount
        )
    },
    async createTracks () {
      for (
        const trackData of this.tracksToCreate
      ) {
        await this.createTrack(
          trackData
        )
      }
    },
    async createTrack (
      trackData
    ) {
      const createArgs =
        this.formatCreateArgs(
          trackData
        )

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorTracks',
            item: trackData
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.createPlaylistTrack(
        createArgs
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatCreateArgs (
      trackData
    ) {
      return {
        playlistId: this.playlistId,
        trackTitle: trackData.title,
        artistName:
          trackData.artist.name,
        albumTitle:
          trackData.album?.title,
        imageUrl:
          trackData.image?.large,
        sourceData: trackData.source,
        audioData: (
          trackData.audio && {
            present:
              trackData.audio.present
          }
        ),
        albumSourceData:
          trackData.album?.source,
        isSelectable: true
      }
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
