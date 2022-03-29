<template>
  <div class="header">
    {{ streamableText }}
  </div>

  <SourceItem
    v-for="sourceData in streamableSourcesCollection"
    :key="sourceData.uuid"
    :sourceData="sourceData"
    :query="query"
    isWithMaxBitrate
  />

  <div class="divider"></div>

  <div class="header">
    {{ otherText }}
  </div>

  <SourceItem
    v-for="sourceData in otherSourcesWithTracksCollection"
    :key="sourceData.uuid"
    :query="query"
    :sourceData="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  streamableCollection as getStreamableSourcesCollection,
  otherWithTracksCollection as getOtherSourcesWithTracksCollection
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
    otherSourcesWithTracksCollection () {
      return getOtherSourcesWithTracksCollection()
    }
  }
}
</script>

<style lang="sass" scoped></style>
