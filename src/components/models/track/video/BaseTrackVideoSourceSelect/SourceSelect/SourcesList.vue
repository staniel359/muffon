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
  video as videoSources
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
      return videoSources
    }
  }
}
</script>

<style lang="sass" scoped></style>
