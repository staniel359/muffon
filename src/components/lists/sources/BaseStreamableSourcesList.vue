<template>
  <SourceItem
    v-for="sourceData in streamableSources"
    :key="sourceData.id"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './BaseStreamableSourcesList/SourceItem.vue'
import {
  streamable as getStreamableSources
} from '@/helpers/formatters/sources'

export default {
  name: 'BaseStreamableSourcesList',
  components: {
    SourceItem
  },
  computed: {
    streamableSources () {
      return getStreamableSources()
    }
  }
}
</script>

<style lang="sass" scoped></style>
