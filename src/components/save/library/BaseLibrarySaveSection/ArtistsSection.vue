<template>
  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="save"
    scope="artists"
    @complete="handleProgressComplete"
  />
  <BaseSaveCompleteSection
    v-else
    model="library"
    scope="artists"
    :error-collection="errorArtists"
    :success-collection-count="successArtistsCount"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import BaseSaveCompleteSection from '../../BaseSaveCompleteSection.vue'
import createLibraryArtist from '*/helpers/actions/api/library/artist/create'
import collectionMixin from '*/mixins/collectionMixin'

export default {
  name: 'ArtistsSection',
  components: {
    BaseProgress,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    artists: {
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
      successArtists: [],
      errorArtists: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    artistsCount () {
      return this.artists.length
    },
    successArtistsCount () {
      return this.successArtists.length
    }
  },
  watch: {
    artists: 'handleArtistsChange'
  },
  mounted () {
    this.processArtists()
  },
  methods: {
    createLibraryArtist,
    async handleArtistsChange () {
      this.isProgress = true
      this.isComplete = false

      this.errorArtists = []

      await this.$nextTick()

      this.processArtists()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processArtists () {
      this.setProgressTotalCount()

      await this.saveArtists()

      this.isComplete = true
    },
    async saveArtists () {
      for (
        const artist of this.artists
      ) {
        await this.saveArtist(
          artist
        )
      }
    },
    async saveArtist (
      artist
    ) {
      const artistFormatted =
        this.formatArtist(
          artist
        )

      const handleSuccess = () => {
        this.addCollectionItem(
          {
            collection: 'successArtists',
            item: artist
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorArtists',
            item: artist
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.createLibraryArtist(
        artistFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatArtist (
      artist
    ) {
      return {
        artistName: artist.name
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.artistsCount
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
