<template>
  <BaseProgress
    v-show="isProgress"
    ref="progress"
    :format-active="formatProgressActive"
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
      isProgress: true
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

      if (this.errorFiles.length) {
        this.isError = true
      }
    },
    formatProgressActive (
      {
        value,
        total
      }
    ) {
      return this.$t(
        'import.active.tracks',
        {
          value,
          total
        }
      )
    },
    startFilesLoading () {
      this.$refs
        .progress
        .setTotalCount(
          this.files.length
        )
    },
    formatFiles () {
      this.files.forEach(
        this.formatFile
      )
    },
    formatFile (
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
          this.addToErrorFiles(
            {
              file
            }
          )
        }
      }

      musicMetadata.parseFile(
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

      this.$refs
        .progress
        .increment()
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

      this.$refs
        .progress
        .increment()
    },
    setSuccessFiles (
      value
    ) {
      this.successFiles = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
