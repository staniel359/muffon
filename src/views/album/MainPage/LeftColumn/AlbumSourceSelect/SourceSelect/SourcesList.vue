<template>
  <div class="menu">
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
import audioSources from '#/data/audio/sources'
import { localize } from '#/actions/plugins/i18n'

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
        this.filterStreamable(true)
      )
    },
    otherHeaderFormatted () {
      return localize(
        'pages.album.sources.other'
      )
    },
    otherSourcesFormatted () {
      return formatCollection(
        this.filterStreamable(false)
      )
    }
  },
  methods: {
    filterStreamable (bool) {
      return audioSources.filter(source => {
        return !!source.isStreamable === bool
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
