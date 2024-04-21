<template>
  <template
    v-if="isShowProgress"
  >
    <BaseProgress
      ref="playlistsProgress"
      status="save"
      scope="playlists"
      @complete="handleProgressComplete"
    />

    <BaseProgress
      ref="tracksProgress"
      class="main-list-bottom-section"
      status="save"
      scope="tracks"
      @complete="handleProgressComplete"
    />
  </template>
  <BaseSaveCompleteSection
    v-else
    model="playlists"
    scope="playlists"
    :error-collection="errorPlaylists"
    :success-collection-count="successPlaylistsCount"
  />
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import BaseSaveCompleteSection
  from '@/components/save/BaseSaveCompleteSection.vue'
import createPlaylist from '@/helpers/actions/api/playlist/create'
import createPlaylistTrack from '@/helpers/actions/api/playlist/track/create'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'SaveSection',
  components: {
    BaseProgress,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    playlists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isMounted: false,
      isProgress: true,
      isComplete: false,
      successPlaylists: [],
      errorPlaylists: [],
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
    playlistsCount () {
      return this.playlists.length
    },
    tracksCount () {
      return this.tracks.length
    },
    tracks () {
      return this.playlists.map(
        this.formatPlaylistTracks
      ).flat()
    },
    successPlaylistsCount () {
      return this.successPlaylists.length
    }
  },
  watch: {
    playlists: 'handlePlaylistsChange'
  },
  mounted () {
    this.isMounted = true

    this.processPlaylists()
  },
  unmounted () {
    this.isMounted = false
  },
  methods: {
    createPlaylist,
    createPlaylistTrack,
    async handlePlaylistsChange () {
      this.isProgress = true
      this.isComplete = false

      this.errorPlaylists = []
      this.errorTracks = []

      await this.$nextTick()

      this.processPlaylists()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processPlaylists () {
      this.setPlaylistsProgressTotalCount()

      this.setTracksProgressTotalCount()

      for (
        const playlistData of this.playlists
      ) {
        if (this.isMounted) {
          await this.savePlaylist(
            {
              playlistData
            }
          )
        }
      }

      this.isComplete = true
    },
    async savePlaylist (
      {
        playlistData
      }
    ) {
      const playlistDataFormatted =
        this.formatPlaylistData(
          {
            playlistData
          }
        )

      const handleSuccess = async (
        response
      ) => {
        this.addCollectionItem(
          {
            collection: 'successPlaylists',
            item: playlistData
          }
        )

        const {
          tracks
        } = playlistData

        const playlistId =
          response.data.playlist.id

        await this.savePlaylistTracks(
          {
            tracks,
            playlistId
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorPlaylists',
            item: playlistData
          }
        )
      }

      const handleFinish = () => {
        this.incrementPlaylistsProgress()
      }

      await this.createPlaylist(
        playlistDataFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    async savePlaylistTracks (
      {
        tracks,
        playlistId
      }
    ) {
      for (
        const trackData of tracks
      ) {
        if (this.isMounted) {
          await this.savePlaylistTrack(
            {
              trackData,
              playlistId
            }
          )
        }
      }
    },
    async savePlaylistTrack (
      {
        trackData,
        playlistId
      }
    ) {
      const trackDataFormatted =
        this.formatTrackData(
          {
            trackData,
            playlistId
          }
        )

      const handleSuccess = () => {
        this.addCollectionItem(
          {
            collection: 'successTracks',
            item: trackData
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorTracks',
            item: trackData
          }
        )
      }

      const handleFinish = () => {
        this.incrementTracksProgress()
      }

      await this.createPlaylistTrack(
        trackDataFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatPlaylistTracks (
      playlistData
    ) {
      return playlistData.tracks
    },
    formatPlaylistData (
      {
        playlistData
      }
    ) {
      const {
        title,
        description,
        image
      } = playlistData

      return {
        title,
        description,
        image: image?.original
      }
    },
    formatTrackData (
      {
        trackData,
        playlistId
      }
    ) {
      const {
        title,
        artist,
        album,
        image,
        source,
        audio,
        created
      } = trackData

      const audioData = (
        audio && {
          present: audio.present
        }
      )

      return {
        playlistId,
        trackTitle: title,
        artistName: artist.name,
        albumTitle: album?.title,
        imageUrl: image?.large,
        sourceData: source,
        audioData,
        albumSourceData: album?.source,
        created
      }
    },
    setPlaylistsProgressTotalCount () {
      this.$refs
        .playlistsProgress
        .setTotalCount(
          this.playlistsCount
        )
    },
    setTracksProgressTotalCount () {
      this.$refs
        .tracksProgress
        .setTotalCount(
          this.tracksCount
        )
    },
    incrementPlaylistsProgress () {
      this.$refs
        .playlistsProgress
        ?.increment()
    },
    incrementTracksProgress () {
      this.$refs
        .tracksProgress
        ?.increment()
    }
  }
}
</script>

<style lang="sass" scoped></style>
