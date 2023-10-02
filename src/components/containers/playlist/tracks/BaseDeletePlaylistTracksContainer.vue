<template>
  <div
    class="active item"
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
      status="delete"
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
import deletePlaylistTrack from '@/helpers/actions/api/playlist/track/delete'

export default {
  name: 'BaseDeletePlaylistTracksContainer',
  components: {
    BaseProgress,
    BaseErrorMessage
  },
  props: {
    playlistId: {
      type: String,
      required: true
    },
    playlistTrackIds: {
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
      errorPlaylistTracksIds: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    playlistTracksCount () {
      return this.playlistTrackIds.length
    }
  },
  mounted () {
    this.playlistTrackIdsToDelete =
      this.playlistTrackIds
  },
  methods: {
    deletePlaylistTrack,
    handleClick () {
      this.processTracks()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processTracks () {
      this.isProgress = true
      this.isComplete = false

      this.errorPlaylistTracksIds = []

      await this.$nextTick()

      this.setProgressTotalCount()

      await this.deleteTracks()

      this.isComplete = true

      if (this.errorPlaylistTracksIds.length) {
        this.playlistTrackIdsToDelete =
          this.errorPlaylistTracksIds

        this.$emit(
          'error'
        )
      } else {
        this.$emit(
          'success',
          []
        )
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.playlistTracksCount
        )
    },
    async deleteTracks () {
      for (
        const playlistTrackId of this.playlistTrackIdsToDelete
      ) {
        await this.deleteTrack(
          playlistTrackId
        )
      }
    },
    async deleteTrack (
      playlistTrackId
    ) {
      const deleteArgs =
        this.formatDeleteArgs(
          playlistTrackId
        )

      const handleError = () => {
        this.errorPlaylistTracksIds = [
          ...this.errorPlaylistTracksIds,
          playlistTrackId
        ]
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.deletePlaylistTrack(
        deleteArgs
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatDeleteArgs (
      playlistTrackId
    ) {
      return {
        playlistId: this.playlistId,
        playlistTrackId,
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
