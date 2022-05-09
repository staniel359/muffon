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
    :error-albums="errorAlbums"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './AlbumsSection/CompleteSection.vue'
import createLibraryAlbum from '*/helpers/actions/api/library/album/create'

export default {
  name: 'AlbumsSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorAlbums: this.setErrorAlbums,
      retry: this.retry
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
      isMounted: false,
      isProgress: true,
      errorAlbums: [],
      status: 'save',
      scope: 'albums'
    }
  },
  computed: {
    totalCount () {
      return this.albums.length
    }
  },
  watch: {
    albums: 'handleAlbumsChange'
  },
  mounted () {
    this.isMounted = true

    this.saveAlbums()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    createLibraryAlbum,
    handleAlbumsChange () {
      this.resetProgress()

      this.saveAlbums()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    retry () {
      this.isComplete = false
      this.isProgress = true

      this.setCollection(
        [
          ...this.errorAlbums
        ]
      )

      this.errorAlbums = []
    },
    async saveAlbums () {
      this.setProgressTotalCount()

      for (const albumData of this.albums) {
        if (this.isMounted) {
          await this.saveAlbum(
            albumData
          )
        }
      }
    },
    async saveAlbum (
      albumData
    ) {
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
          this.incrementProgress()
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
    formatAlbum (
      albumData
    ) {
      return {
        albumTitle: albumData.title,
        artistName:
          albumData.artist.name,
        imageUrl:
          albumData.image?.original
      }
    },
    setErrorAlbums (
      value
    ) {
      this.errorAlbums = value
    },
    resetProgress () {
      this.$refs
        .progress
        .reset()
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
