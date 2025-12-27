<template>
  <div class="main-bottom-section">
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

    <BaseProgress
      ref="progress"
      status="save"
      :scope="scope"
      @complete.once="handleProgressComplete"
    />
  </div>
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'

import createPlaylist from '@/helpers/actions/api/playlist/create'
import createPlaylistTrack
  from '@/helpers/actions/api/playlist/track/create'

export default {
  name: 'PlaylistTracksImportSection',
  components: {
    BaseProgress,
    BaseErrorMessage
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'playlistCreateSuccess',
    'playlistCreateError',
    'complete'
  ],
  data () {
    return {
      scope: 'tracks',
      playlistId: null,
      currentTrackIndex: null,
      tracksComputed: [],
      error: null
    }
  },
  computed: {
    tracksCount () {
      return this.tracksComputed.length
    },
    tracks () {
      return this.playlistData.tracks
    },
    playlistArgs () {
      return {
        title: this.playlistTitle,
        description: this.playlistDescription,
        image: this.playlistImageData?.original,
        isPrivate: this.isPlaylistPrivate
      }
    },
    playlistTitle () {
      return this.playlistData.title
    },
    playlistDescription () {
      return this.playlistData.description
    },
    playlistImageData () {
      return this.playlistData.image
    },
    isPlaylistPrivate () {
      return this.playlistData.private
    },
    currentTrackData () {
      return this.tracksComputed[
        this.currentTrackIndex
      ]
    },
    isGetNextTrackData () {
      return (
        this.currentTrackIndex < (
          this.tracksCount - 1
        )
      )
    },
    currentTrackArgs () {
      return {
        playlistId: this.playlistId,
        trackTitle: this.currentTrackTitle,
        artistName: this.currentTrackArtistName,
        albumTitle: this.currentTrackAlbumTitle,
        imageUrl: this.currentTrackImageData?.large,
        sourceData: this.currentTrackSourceData,
        ...(this.isCurrentTrackAudioPresent && {
          audioData: {
            present: true
          }
        }),
        albumSourceData: this.currentTrackAlbumSourceData,
        created: this.currentTrackCreated
      }
    },
    currentTrackTitle () {
      return this.currentTrackData.title
    },
    currentTrackArtistName () {
      return this.currentTrackData.artist.name
    },
    currentTrackAlbumTitle () {
      return this.currentTrackAlbumData?.title
    },
    currentTrackAlbumData () {
      return this.currentTrackData.album
    },
    currentTrackImageData () {
      return this.currentTrackData.image
    },
    currentTrackSourceData () {
      return this.currentTrackData.source
    },
    isCurrentTrackAudioPresent () {
      return this.currentTrackData.audio?.present
    },
    currentTrackAlbumSourceData () {
      return this.currentTrackAlbumData?.source
    },
    currentTrackCreated () {
      return this.currentTrackData.created
    }
  },
  watch: {
    currentTrackIndex: 'handleCurrentTrackIndexChange'
  },
  beforeMount () {
    this.tracksComputed = [
      ...this.tracks
    ]
  },
  mounted () {
    this.savePlaylist()
  },
  methods: {
    createPlaylist,
    createPlaylistTrack,
    handlePlaylistCreateSuccess (
      response
    ) {
      this.playlistId = response.data.playlist.id

      this.emitPlaylistCreateSuccess()

      if (this.tracksCount) {
        this.setProgressTotalCount()

        this.currentTrackIndex = 0
      } else {
        this.emitComplete()
      }
    },
    handlePlaylistCreateError (
      error
    ) {
      const isConnectionError = !error.response?.status

      if (isConnectionError) {
        this.emitPlaylistCreateError(
          {
            error
          }
        )
      } else {
        this.emitPlaylistCreateError()

        this.emitComplete()
      }
    },
    handleProgressComplete () {
      this.emitComplete()
    },
    handleCurrentTrackIndexChange () {
      this.saveTrack()
    },
    handleTrackCreateSuccess () {
      this.incrementProgress()

      if (this.isGetNextTrackData) {
        this.currentTrackIndex += 1
      }
    },
    handleRefresh () {
      this.saveTrack()
    },
    savePlaylist () {
      this.createPlaylist(
        this.playlistArgs
      ).then(
        this.handlePlaylistCreateSuccess
      ).catch(
        this.handlePlaylistCreateError
      )
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.tracksCount
        )
    },
    saveTrack () {
      this.createPlaylistTrack(
        this.currentTrackArgs
      ).then(
        this.handleTrackCreateSuccess
      )
    },
    incrementProgress () {
      this.$refs
        .progress
        .increment()
    },
    emitPlaylistCreateSuccess () {
      this.$emit(
        'playlistCreateSuccess',
        {
          playlistData: this.playlistData
        }
      )
    },
    emitPlaylistCreateError (
      {
        error
      } = {}
    ) {
      this.$emit(
        'playlistCreateError',
        {
          playlistData: this.playlistData,
          error
        }
      )
    },
    emitComplete () {
      this.$emit(
        'complete'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
