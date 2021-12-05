<template>
  <SourceItem
    v-for="sourceData in sourcesFormatted"
    :key="sourceData.uuid"
    :sourceData="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  getStreamable as getAudioSourcesStreamable
} from '#/actions/audio/sources'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  computed: {
    sourcesFormatted () {
      return formatCollection(
        this.sources
      )
    },
    sources () {
      return getAudioSourcesStreamable(true)
    }
  }
}
</script>

<style lang="sass" scoped></style>
