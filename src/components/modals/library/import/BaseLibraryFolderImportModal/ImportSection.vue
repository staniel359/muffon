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
import BaseProgress from '@/components/BaseProgress.vue'
import BaseImportCompleteSection
  from '@/components/import/BaseImportCompleteSection.vue'
import {
  formatTags as formatFileTags
} from '@/helpers/actions/file'
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
    formatFileTags,
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
        await this.formatFileTags(
          file
        )
      }
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
