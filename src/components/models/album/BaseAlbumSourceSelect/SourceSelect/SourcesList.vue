<template>
  <div class="menu">
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
  </div>
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'
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
      return localize(
        'shared.sources.streamable'
      )
    },
    streamableSourcesFormatted () {
      return formatCollection(
        getAudioSourcesStreamable(true)
      )
    },
    otherHeaderFormatted () {
      return localize(
        'shared.sources.other'
      )
    },
    otherSourcesFormatted () {
      return formatCollection(
        getAudioSourcesStreamable(false)
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
