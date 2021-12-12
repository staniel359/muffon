<template>
  <SourceItem
    v-for="sourceData in sourcesCollection"
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
    sourcesCollection () {
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
