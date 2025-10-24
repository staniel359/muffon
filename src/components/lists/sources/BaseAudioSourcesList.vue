<template>
  <SourceItem
    v-for="sourceData in sources"
    :key="sourceData.id"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './BaseAudioSourcesList/SourceItem.vue'
import {
  audioMaxBitrateSorted as audioMaxBitrateSortedSources
} from '@/helpers/formatters/sources'

export default {
  name: 'BaseAudioSourcesList',
  components: {
    SourceItem
  },
  computed: {
    sources () {
      return audioMaxBitrateSortedSources
    }
  }
}
</script>

<style lang="sass" scoped></style>
