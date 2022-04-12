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
    :errorAlbums="errorAlbums"
    @retry="handleRetry"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './AlbumsSection/CompleteSection.vue'
import createLibraryAlbum from '*/helpers/actions/api/library/album/create'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'AlbumsSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorAlbums: this.setErrorAlbums
    }
  },
  inject: [
    'setCollection'
  ],
  props: {
    albums: {
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
      errorAlbums: []
    }
  },
  computed: {
    totalCount () {
      return this.albums.length
    }
  },
  mounted () {
    this.isMounted = true

    this.saveAlbums()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  watch: {
    albums: 'handleAlbumsChange'
  },
  methods: {
    handleAlbumsChange () {
      this.$refs.progress.reset()

      this.saveAlbums()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    handleRetry () {
      this.isComplete = false
      this.isError = false
      this.isProgress = true

      this.setCollection(
        [...this.errorAlbums]
      )

      this.errorAlbums = []
    },
    createLibraryAlbum,
    formatProgressActive ({ value, total }) {
      return this.$t(
        'save.active.albums',
        { value, total }
      )
    },
    async saveAlbums () {
      this.$refs.progress.setTotalCount(
        this.totalCount
      )

      for (const albumData of this.albums) {
        if (this.isMounted) {
          await this.saveAlbum(
            albumData
          )
        }
      }
    },
    async saveAlbum (albumData) {
      const albumFormatted =
        this.formatAlbum(
          albumData
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorAlbums.push(
            albumData
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.$refs.progress.increment()
        }
      }

      await this.createLibraryAlbum(
        albumFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatAlbum (albumData) {
      const artistName =
        formatArtistName(
          albumData.artists
        )

      return {
        albumTitle: albumData.title,
        artistName,
        imageUrl: albumData.image?.original
      }
    },
    setErrorAlbums (value) {
      this.errorAlbums = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
