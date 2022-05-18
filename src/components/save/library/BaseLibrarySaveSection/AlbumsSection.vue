<template>
  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="save"
    scope="albums"
    @complete="handleProgressComplete"
  />
  <BaseSaveCompleteSection
    v-else
    model="library"
    scope="albums"
    :error-collection="errorAlbums"
    :success-collection-count="successAlbumsCount"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import BaseSaveCompleteSection from '../../BaseSaveCompleteSection.vue'
import createLibraryAlbum from '*/helpers/actions/api/library/album/create'
import collectionMixin from '*/mixins/collectionMixin'

export default {
  name: 'AlbumsSection',
  components: {
    BaseProgress,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    albums: {
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
      successAlbums: [],
      errorAlbums: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    albumsCount () {
      return this.albums.length
    },
    successAlbumsCount () {
      return this.successAlbums.length
    }
  },
  watch: {
    albums: 'handleAlbumsChange'
  },
  mounted () {
    this.processAlbums()
  },
  methods: {
    createLibraryAlbum,
    async handleAlbumsChange () {
      this.isProgress = true
      this.isComplete = false

      this.errorAlbums = []

      await this.$nextTick()

      this.processAlbums()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processAlbums () {
      this.setProgressTotalCount()

      await this.saveAlbums()

      this.isComplete = true
    },
    async saveAlbums () {
      for (
        const album of this.albums
      ) {
        await this.saveAlbum(
          album
        )
      }
    },
    async saveAlbum (
      album
    ) {
      const albumFormatted =
        this.formatAlbum(
          album
        )

      const handleSuccess = () => {
        this.addCollectionItem(
          {
            collection: 'successAlbums',
            item: album
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorAlbums',
            item: album
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.createLibraryAlbum(
        albumFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatAlbum (
      album
    ) {
      return {
        albumTitle: album.title,
        artistName: album.artist.name,
        imageUrl: album.image?.original
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.albumsCount
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
