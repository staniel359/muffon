<template>
  <ProcessingSection
    v-if="status === 'processing'"
    :source="source"
    :playlists-count="playlistsCount"
    @complete="handleProcessingComplete"
  />
  <BaseImportCompleteSection
    v-else-if="status === 'complete'"
    text-scope="playlists"
    scope="playlists"
    :success-collection="successPlaylists"
  />
</template>

<script>
import ProcessingSection from './ImportSection/ProcessingSection.vue'
import BaseImportCompleteSection
  from '@/components/import/BaseImportCompleteSection.vue'

import collectionMixin from '@/mixins/collectionMixin'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'ImportSection',
  components: {
    ProcessingSection,
    BaseImportCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    source: String,
    playlistsCount: Number
  },
  data () {
    return {
      status: null,
      successPlaylists: []
    }
  },
  mounted () {
    this.status = 'processing'
  },
  methods: {
    handleProcessingComplete (
      {
        successPlaylists
      }
    ) {
      this.successPlaylists =
        formatCollection(
          successPlaylists
        )

      this.status = 'complete'
    }
  }
}
</script>

<style lang="sass" scoped></style>
