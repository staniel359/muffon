<template>
  <div class="menu sources-list">
    <div class="header">
      {{ streamableHeaderFormatted }}
    </div>

    <SourceItem
      v-for="sourceData in streamableSourcesFormatted"
      :key="sourceData.uuid"
      :sourceData="sourceData"
      :artistName="artistName"
      :albumTitle="albumTitle"
      isWithMaxBitrate
    />

    <div class="divider"></div>

    <div class="header">
      {{ otherHeaderFormatted }}
    </div>

    <SourceItem
      v-for="sourceData in otherSourcesFormatted"
      :key="sourceData.uuid"
      :artistName="artistName"
      :albumTitle="albumTitle"
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
    artistName: String,
    albumTitle: String
  },
  computed: {
    streamableHeaderFormatted () {
      return localize(
        'pages.album.sources.streamable'
      )
    },
    streamableSourcesFormatted () {
      return formatCollection(
        getAudioSourcesStreamable(true)
      )
    },
    otherHeaderFormatted () {
      return localize(
        'pages.album.sources.other'
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

<style lang="sass" scoped>
.ui.dropdown .sources-list
  width: $albumSourceSelectMenuWidth !important
</style>
