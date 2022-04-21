<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :active-text-key="activeTextKey"
    @complete="handleProgressComplete"
  />

  <CompleteSection
    v-if="isComplete"
    :is-error="isError"
    :error-files="errorFiles"
    :success-files="successFiles"
  />
</template>

<script>
import musicMetadata from 'music-metadata'
import BaseProgress from '*/components/BaseProgress.vue'
import CompleteSection from './ImportSection/CompleteSection.vue'
import {
  tags as formatFileTags
} from '*/helpers/formatters/file'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'ImportSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setSuccessFiles: this.setSuccessFiles
    }
  },
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      errorFiles: [],
      successFiles: [],
      isComplete: false,
      isError: false,
      isMounted: false,
      isProgress: true,
      activeTextKey: 'import.active.tracks'
    }
  },
  mounted () {
    this.isMounted = true

    if (this.files.length) {
      this.startFilesLoading()

      this.formatFiles()
    }
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    startFilesLoading () {
      this.setProgressTotalCount()
    },
    async formatFiles () {
      for (const file of this.files) {
        if (this.isMounted) {
          await this.formatFile(
            file
          )
        }
      }
    },
    async formatFile (
      file
    ) {
      const handleSuccess = (
        metadata
      ) => {
        if (this.isMounted) {
          this.addToSuccessFiles(
            {
              tags: metadata.common,
              file
            }
          )
        }
      }

      const handleError = () => {
        if (this.isMounted) {
          this.isError = true

          this.addToErrorFiles(
            {
              file
            }
          )
        }
      }

      await musicMetadata.parseFile(
        file.path
      ).then(
        handleSuccess
      ).catch(
        handleError
      )
    },
    addToSuccessFiles (
      {
        tags,
        file
      }
    ) {
      const fileData = {
        uuid: generateKey(),
        ...formatFileTags(
          tags,
          file
        )
      }

      this.successFiles.push(
        fileData
      )

      this.incrementProgress()
    },
    addToErrorFiles (
      {
        file
      }
    ) {
      const fileData = {
        uuid: generateKey(),
        text: file.path
      }

      this.errorFiles.push(
        fileData
      )

      this.incrementProgress()
    },
    setSuccessFiles (
      value
    ) {
      this.successFiles = value
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.files.length
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
