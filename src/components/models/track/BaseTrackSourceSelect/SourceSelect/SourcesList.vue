<template>
  <div class="header">
    {{ streamableHeaderFormatted }}
  </div>

  <SourceItem
    v-for="sourceData in streamableSourcesFormatted"
    :key="sourceData.uuid"
    :sourceData="sourceData"
    :query="query"
    isWithMaxBitrate
  />

  <div class="divider"></div>

  <div class="header">
    {{ otherHeaderFormatted }}
  </div>

  <SourceItem
    v-for="sourceData in otherSourcesFormatted"
    :key="sourceData.uuid"
    :query="query"
    :sourceData="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import { collection as formatCollection } from '#/formatters'
import {
  getStreamable as getAudioSourcesStreamable
} from '#/actions/audio/sources'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  props: {
    query: String
  },
  computed: {
    streamableHeaderFormatted () {
      return this.$t(
        'shared.sources.streamable'
      )
    },
    streamableSourcesFormatted () {
      return formatCollection(
        getAudioSourcesStreamable(true)
      )
    },
    otherHeaderFormatted () {
      return this.$t(
        'shared.sources.other'
      )
    },
    otherSourcesFormatted () {
      return formatCollection(
        this.otherSourcesWithTracks
      )
    },
    otherSourcesWithTracks () {
      return getAudioSourcesStreamable(false).filter(
        this.getIsSourceWithTracks
      )
    }
  },
  methods: {
    getIsSourceWithTracks (sourceData) {
      return sourceData.isWithTracks
    }
  }
}
</script>

<style lang="sass" scoped></style>
