<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :active-text-key="activeTextKey"
    @complete="handleProgressComplete"
  />

  <CompleteSection
    v-if="isComplete"
    :total-count="totalCount"
    :error-files="errorFiles"
  />
</template>

<script>
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './SaveSection/CompleteSection.vue'
import createLibraryTrack from '*/helpers/actions/api/library/track/create'

export default {
  name: 'SaveSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorFiles: this.setErrorFiles,
      retry: this.retry
    }
  },
  inject: [
    'setFiles'
  ],
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isComplete: false,
      isMounted: false,
      isProgress: true,
      errorFiles: [],
      activeTextKey: 'save.active.tracks'
    }
  },
  computed: {
    totalCount () {
      return this.files.length
    }
  },
  watch: {
    files: 'handleFilesChange'
  },
  mounted () {
    this.isMounted = true

    this.saveFiles()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    createLibraryTrack,
    handleFilesChange () {
      this.resetProgress()

      this.saveFiles()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    retry () {
      this.isComplete = false
      this.isProgress = true

      this.setFiles(
        this.errorFiles
      )

      this.errorFiles = []
    },
    async saveFiles () {
      this.setProgressTotalCount()

      for (const file of this.files) {
        if (this.isMounted) {
          await this.saveFile(
            file
          )
        }
      }
    },
    async saveFile (
      file
    ) {
      const fileFormatted =
        this.formatFile(
          file
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorFiles.push(
            file
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.incrementProgress()
        }
      }

      await this.createLibraryTrack(
        fileFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatFile (
      file
    ) {
      return {
        trackTitle: file.title,
        artistName: file.artist.name,
        albumTitle: file.album?.title,
        image: file.image?.original,
        created: file.created
      }
    },
    setErrorFiles (
      value
    ) {
      this.errorFiles = value
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
