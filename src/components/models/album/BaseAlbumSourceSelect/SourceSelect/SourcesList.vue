<template>
  <div
    class="header"
    v-text="streamableText"
  />

  <SourceItem
    v-for="sourceData in streamableSources"
    :key="sourceData.id"
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
    v-for="sourceData in otherSourcesWithAlbums"
    :key="sourceData.id"
    :query="query"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  streamable as getStreamableSources,
  otherWithAlbums as getOtherSourcesWithAlbums
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
    streamableSources () {
      return getStreamableSources()
    },
    otherText () {
      return this.$t(
        'sources.other'
      )
    },
    otherSourcesWithAlbums () {
      return getOtherSourcesWithAlbums()
    }
  }
}
</script>

<style lang="sass" scoped></style>
