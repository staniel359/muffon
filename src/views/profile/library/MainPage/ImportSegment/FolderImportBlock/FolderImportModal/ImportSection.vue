<template>
  <div class="main-library-modal-import-section">
    <BaseProgress
      v-show="isProgress"
      ref="progress"
      :formatActive="formatProgressActive"
      @complete="handleProgressComplete"
    />

    <CompleteSection
      v-if="isComplete"
      :isError="isError"
      :errorFiles="errorFiles"
      :successFiles="successFiles"
    />
  </div>
</template>

<script>
import jsmediatags from 'jsmediatags'
import BaseProgress from '@/BaseProgress.vue'
import CompleteSection from './ImportSection/CompleteSection.vue'
import { tags as formatFileTags } from '#/formatters/file'
import { generateKey } from '#/utils'

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
    formatProgressActive ({ value, total }) {
      return this.$t(
        'shared.add.import.active.tracks',
        { value, total }
      )
    },
    startFilesLoading () {
      this.$refs.progress.setTotalCount(
        this.files.length
      )
    },
    formatFiles () {
      this.files.forEach(
        this.formatFile
      )
    },
    formatFile (file) {
      const reader = new jsmediatags.Reader(
        file
      )

      const handleSuccess = ({ tags }) => {
        if (this.isMounted) {
          this.addToSuccessFiles(
            { tags, file }
          )
        }
      }

      const handleError = () => {
        if (this.isMounted) {
          this.addToErrorFiles(
            { file }
          )
        }
      }

      reader.read({
        onSuccess: handleSuccess,
        onError: handleError
      })
    },
    addToSuccessFiles ({ tags, file }) {
      const dataFormatted = {
        uuid: generateKey(),
        ...formatFileTags(
          tags, file
        )
      }

      this.successFiles.push(
        dataFormatted
      )

      this.$refs.progress.increment()
    },
    addToErrorFiles ({ file }) {
      const dataFormatted = {
        uuid: generateKey(),
        text: file.path
      }

      this.errorFiles.push(
        dataFormatted
      )

      this.$refs.progress.increment()
    },
    setSuccessFiles (value) {
      this.successFiles = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
