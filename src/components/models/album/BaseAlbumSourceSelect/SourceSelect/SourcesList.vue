<template>
  <div
    class="header"
    v-text="streamableText"
  />

  <SourceItem
    v-for="sourceData in streamableSourcesCollection"
    :key="sourceData.uuid"
    :source-data="sourceData"
    :query="query"
    is-with-max-bitrate
  />

  <div class="divider" />

  <div
    class="header"
    v-text="otherText"
  />

  <SourceItem
    v-for="sourceData in otherSourcesWithAlbumsCollection"
    :key="sourceData.uuid"
    :query="query"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  streamableCollection as getStreamableSourcesCollection,
  otherWithAlbumsCollection as getOtherSourcesWithAlbumsCollection
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
    streamableText () {
      return this.$t(
        'sources.streamable'
      )
    },
    streamableSourcesCollection () {
      return getStreamableSourcesCollection()
    },
    otherText () {
      return this.$t(
        'sources.other'
      )
    },
    otherSourcesWithAlbumsCollection () {
      return getOtherSourcesWithAlbumsCollection()
    }
  }
}
</script>

<style lang="sass" scoped></style>
