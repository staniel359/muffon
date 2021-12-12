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
    v-for="sourceData in otherSourcesCollection"
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
    streamableText () {
      return this.$t(
        'shared.sources.streamable'
      )
    },
    streamableSourcesCollection () {
      return formatCollection(
        getAudioSourcesStreamable(true)
      )
    },
    otherText () {
      return this.$t(
        'shared.sources.other'
      )
    },
    otherSourcesCollection () {
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
