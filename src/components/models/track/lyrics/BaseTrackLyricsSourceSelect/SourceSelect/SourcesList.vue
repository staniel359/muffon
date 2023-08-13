<template>
  <SourceItem
    v-for="sourceData in sources"
    :key="sourceData.id"
    :source-data="sourceData"
    :query="query"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  withLyrics as sourcesWithLyrics
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
    sources () {
      return sourcesWithLyrics
    }
  }
}
</script>

<style lang="sass" scoped></style>
