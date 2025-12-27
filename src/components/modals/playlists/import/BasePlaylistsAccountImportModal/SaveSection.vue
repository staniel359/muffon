<template>
  <ProcessingSection
    v-if="status === 'processing'"
    :playlists="playlists"
    @complete="handleProcessingComplete"
  />
  <BaseSaveCompleteSection
    v-else-if="status === 'complete'"
    model="playlists"
    :scope="scope"
    :error-collection="errorPlaylists"
    :success-collection-count="successPlaylistsCount"
  />
</template>

<script>
import ProcessingSection from './SaveSection/ProcessingSection.vue'
import BaseSaveCompleteSection
  from '@/components/save/BaseSaveCompleteSection.vue'

import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'SaveSection',
  components: {
    ProcessingSection,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    playlists: Array
  },
  data () {
    return {
      scope: 'playlists',
      status: 'processing',
      successPlaylists: [],
      errorPlaylists: []
    }
  },
  computed: {
    successPlaylistsCount () {
      return this.successPlaylists.length
    }
  },
  methods: {
    handleProcessingComplete (
      {
        successPlaylists,
        errorPlaylists
      }
    ) {
      this.successPlaylists = successPlaylists

      this.errorPlaylists = errorPlaylists

      this.status = 'complete'
    }
  }
}
</script>

<style lang="sass" scoped></style>
