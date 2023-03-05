<template>
  <div
    class="header"
    v-text="audioText"
  />

  <SourceItem
    v-for="sourceData in audioSources"
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
    v-for="sourceData in nonAudioSources"
    :key="sourceData.id"
    :query="query"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  albumAudio as albumAudioSources,
  albumNonAudio as albumNonAudioSources
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
    audioText () {
      return this.$t(
        'sources.audio'
      )
    },
    audioSources () {
      return albumAudioSources
    },
    otherText () {
      return this.$t(
        'sources.other'
      )
    },
    nonAudioSources () {
      return albumNonAudioSources
    }
  }
}
</script>

<style lang="sass" scoped></style>
