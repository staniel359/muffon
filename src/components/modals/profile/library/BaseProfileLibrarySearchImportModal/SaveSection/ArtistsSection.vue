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
      :errorArtists="errorArtists"
      @retry="handleRetry"
    />
  </div>
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './ArtistsSection/CompleteSection.vue'
import createProfileLibraryArtist
  from '*/helpers/actions/api/profile/library/artist/create'

export default {
  name: 'ArtistsSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorArtists: this.setErrorArtists
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
      isError: false,
      isMounted: false,
      isProgress: true,
      errorArtists: []
    }
  },
  computed: {
    totalCount () {
      return this.artists.length
    }
  },
  mounted () {
    this.isMounted = true

    this.saveArtists()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  watch: {
    artists: 'handleArtistsChange'
  },
  methods: {
    handleArtistsChange () {
      this.$refs.progress.reset()

      this.saveArtists()
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
        [...this.errorArtists]
      )

      this.errorArtists = []
    },
    createProfileLibraryArtist,
    formatProgressActive ({ value, total }) {
      return this.$t(
        'save.active.artists',
        { value, total }
      )
    },
    async saveArtists () {
      this.$refs.progress.setTotalCount(
        this.totalCount
      )

      for (const artistData of this.artists) {
        if (this.isMounted) {
          await this.saveArtist(
            artistData
          )
        }
      }
    },
    async saveArtist (artistData) {
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
          this.$refs.progress.increment()
        }
      }

      await this.createProfileLibraryArtist(
        artistFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatArtist (artistData) {
      return {
        artistName: artistData.name
      }
    },
    setErrorArtists (value) {
      this.errorArtists = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
