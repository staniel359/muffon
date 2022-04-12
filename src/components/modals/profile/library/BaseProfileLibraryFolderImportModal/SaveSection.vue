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
    :errorFiles="errorFiles"
    @retry="handleRetry"
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
      setErrorFiles: this.setErrorFiles
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
      isError: false,
      isMounted: false,
      isProgress: true,
      errorFiles: []
    }
  },
  computed: {
    totalCount () {
      return this.files.length
    }
  },
  mounted () {
    this.isMounted = true

    this.saveFiles()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  watch: {
    files: 'handleFilesChange'
  },
  methods: {
    handleFilesChange () {
      this.$refs.progress.reset()

      this.saveFiles()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    handleRetry () {
      this.isComplete = false
      this.isError = false
      this.isProgress = true

      this.setFiles(
        this.errorFiles
      )

      this.errorFiles = []
    },
    createLibraryTrack,
    formatProgressActive ({ value, total }) {
      return this.$t(
        'save.active.tracks',
        { value, total }
      )
    },
    async saveFiles () {
      this.$refs.progress.setTotalCount(
        this.totalCount
      )

      for (const fileData of this.files) {
        if (this.isMounted) {
          await this.saveFile(fileData)
        }
      }
    },
    async saveFile (fileData) {
      const fileFormatted =
        this.formatFile(
          fileData
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorFiles.push(
            fileData
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.$refs.progress.increment()
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
    formatFile (fileData) {
      return {
        trackTitle: fileData.title,
        artistName: fileData.artist.name,
        albumTitle: fileData.album?.title,
        image: fileData.image?.original,
        created: fileData.created
      }
    },
    setErrorFiles (value) {
      this.errorFiles = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
