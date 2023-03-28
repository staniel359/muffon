<template>
  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="import"
    scope="files"
    @complete="handleProgressComplete"
  />
  <BaseImportCompleteSection
    v-else
    scope="files"
    :error-collection="errorTracks"
    :success-collection="successTracks"
  />
</template>

<script>
import {
  parseFile
} from 'music-metadata'
import BaseProgress from '@/components/BaseProgress.vue'
import BaseImportCompleteSection
  from '@/components/import/BaseImportCompleteSection.vue'
import {
  metatags as formatAudioFileMetatags
} from '@/helpers/formatters/audioFile'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'ImportSection',
  components: {
    BaseProgress,
    BaseImportCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    files: {
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
      errorTracks: [],
      successTracks: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    filesCount () {
      return this.files.length
    }
  },
  mounted () {
    this.processFiles()
  },
  methods: {
    formatAudioFileMetatags,
    handleProgressComplete () {
      this.isProgress = false
    },
    async processFiles () {
      this.setProgressTotalCount()

      await this.formatFiles()

      this.isComplete = true
    },
    async formatFiles () {
      for (
        const file of this.files
      ) {
        await this.formatFile(
          file
        )
      }
    },
    async formatFile (
      file
    ) {
      const filePath = file.path

      const handleSuccess = async (
        metadata
      ) => {
        const successTrack =
          await formatAudioFileMetatags(
            {
              filePath,
              metatags:
                metadata.common
            }
          )

        this.addCollectionItem(
          {
            collection: 'successTracks',
            item: successTrack
          }
        )
      }

      const handleError = () => {
        const errorTrack = {
          text: filePath
        }

        this.addCollectionItem(
          {
            collection: 'errorTracks',
            item: errorTrack
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await parseFile(
        filePath
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.filesCount
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
