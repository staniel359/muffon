<template>
  <SourceItem
    v-for="sourceData in sourcesWithAlbums"
    :key="sourceData.id"
    :source-data="sourceData"
    :query="query"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  allWithAlbums as getSourcesWithAlbums
} from '@/helpers/formatters/sources'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  props: {
    query: String
  },
  computed: {
    sourcesWithAlbums () {
      return getSourcesWithAlbums()
    }
  }
}
</script>

<style lang="sass" scoped></style>
