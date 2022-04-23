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
    :error-artists="errorArtists"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './ArtistsSection/CompleteSection.vue'
import createLibraryArtist from '*/helpers/actions/api/library/artist/create'

export default {
  name: 'ArtistsSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorArtists: this.setErrorArtists,
      retry: this.retry
    }
  },
  inject: [
    'setCollection'
  ],
  props: {
    artists: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isComplete: false,
      isMounted: false,
      isProgress: true,
      errorArtists: [],
      status: 'save',
      scope: 'artists'
    }
  },
  computed: {
    totalCount () {
      return this.artists.length
    }
  },
  watch: {
    artists: 'handleArtistsChange'
  },
  mounted () {
    this.isMounted = true

    this.saveArtists()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    createLibraryArtist,
    handleArtistsChange () {
      this.resetProgress()

      this.saveArtists()
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
          ...this.errorArtists
        ]
      )

      this.errorArtists = []
    },
    async saveArtists () {
      this.setProgressTotalCount()

      for (const artistData of this.artists) {
        if (this.isMounted) {
          await this.saveArtist(
            artistData
          )
        }
      }
    },
    async saveArtist (
      artistData
    ) {
      const artistFormatted =
        this.formatArtist(
          artistData
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorArtists.push(
            artistData
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.incrementProgress()
        }
      }

      await this.createLibraryArtist(
        artistFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatArtist (
      artistData
    ) {
      return {
        artistName: artistData.name
      }
    },
    setErrorArtists (
      value
    ) {
      this.errorArtists = value
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
