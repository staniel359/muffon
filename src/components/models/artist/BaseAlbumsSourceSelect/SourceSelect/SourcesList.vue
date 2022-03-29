<template>
  <SourceItem
    v-for="sourceData in sourcesWithAlbumsCollection"
    :key="sourceData.uuid"
    :sourceData="sourceData"
    :query="query"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  allWithAlbumsCollection as getSourcesWithAlbumsCollection
} from '*/helpers/formatters/sources'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  props: {
    query: String
  },
  computed: {
    sourcesWithAlbumsCollection () {
      return getSourcesWithAlbumsCollection()
    }
  }
}
</script>

<style lang="sass" scoped></style>
