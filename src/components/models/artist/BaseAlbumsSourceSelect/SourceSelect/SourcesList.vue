<template>
  <div class="menu">
    <SourceItem
      v-for="sourceData in audioSourcesFormatted"
      :key="sourceData.uuid"
      :sourceData="sourceData"
      :query="query"
    />
  </div>
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import { collection as formatCollection } from '#/formatters'
import audioSources from '#/data/audio/sources'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  props: {
    query: String
  },
  computed: {
    audioSourcesFormatted () {
      return formatCollection(
        this.audioSourcesWithAlbums
      )
    },
    audioSourcesWithAlbums () {
      return audioSources.filter(sourceData => {
        return sourceData.isWithAlbums
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
