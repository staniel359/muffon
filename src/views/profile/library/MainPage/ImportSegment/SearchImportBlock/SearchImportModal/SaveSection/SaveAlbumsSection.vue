<template>
  <div class="main-library-modal-save-section">
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
  </div>
</template>

<script>
import BaseProgress from '@/BaseProgress.vue'
import CompleteSection from './SaveAlbumsSection/CompleteSection.vue'
import postAlbumData from '#/actions/api/profile/library/albums/postData'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SaveAlbumsSection',
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
    'setAlbums'
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

      this.setAlbums(
        [...this.errorAlbums]
      )

      this.errorAlbums = []
    },
    postAlbumData,
    formatProgressActive ({ value, total }) {
      return localize(
        'pages.library.add.search.active.save.albums',
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
      const albumFormatted = this.formatAlbum(
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

      await this.postAlbumData(albumFormatted)
        .catch(handleError)
        .finally(handleFinish)
    },
    formatAlbum (albumData) {
      return {
        title: albumData.title,
        artistName: albumData.artist.name,
        imageUrl: albumData.image.medium
      }
    },
    setErrorAlbums (value) {
      this.errorAlbums = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
