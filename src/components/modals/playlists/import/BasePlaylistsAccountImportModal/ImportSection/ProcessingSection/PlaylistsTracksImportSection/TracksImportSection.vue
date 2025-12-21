<template>
  <div
    v-if="error"
    class="main-top-section"
  >
    <BaseErrorMessage
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
  </div>

  <div class="main-top-small-section main-bottom-extrasmall-section">
    <BaseProgress
      ref="progress"
      status="import"
      :scope="scope"
      @complete.once="handleProgressComplete"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseProgress from '@/components/BaseProgress.vue'

import getUserPlaylist from '@/helpers/actions/api/user/playlist/get'

export default {
  name: 'TracksImportSection',
  components: {
    BaseErrorMessage,
    BaseProgress
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'complete'
  ],
  data () {
    return {
      scope: 'tracks',
      userData: {},
      error: null,
      tracks: [],
      page: 1
    }
  },
  computed: {
    tracksCount () {
      return this.playlistData.tracks_count
    },
    playlistArgs () {
      return {
        source: this.source,
        playlistId: this.playlistId,
        scope: this.scope,
        page: this.page
      }
    },
    source () {
      return this.sourceData.name
    },
    sourceData () {
      return this.playlistData.source
    },
    playlistId () {
      return this.sourceData.id
    },
    isGetNextPageData () {
      return (
        this.page < this.totalPagesCount
      )
    },
    totalPagesCount () {
      return this.userData?.playlist?.total_pages
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  mounted () {
    if (this.tracksCount) {
      this.setProgressTotalCount()

      this.getPlaylistData()
    } else {
      this.setComplete()
    }
  },
  methods: {
    getUserPlaylist,
    handleUserDataChange (
      value
    ) {
      const {
        tracks
      } = value.playlist

      this.tracks = [
        ...this.tracks,
        ...tracks
      ]

      this.setProgressValue(
        this.tracks.length
      )

      if (this.isGetNextPageData) {
        this.page += 1

        this.getPlaylistData()
      }
    },
    handleRefresh () {
      this.getPlaylistData()
    },
    handleProgressComplete () {
      this.setComplete()
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.tracksCount
        )
    },
    getPlaylistData () {
      this.getUserPlaylist(
        this.playlistArgs
      )
    },
    setProgressValue (
      value
    ) {
      this.$refs
        .progress
        .setValue(
          value
        )
    },
    setComplete () {
      this.$emit(
        'complete',
        {
          tracks: this.tracks
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
