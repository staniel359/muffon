<template>
  <SourceItem
    v-for="sourceData in streamableSourcesCollection"
    :key="sourceData.uuid"
    :sourceData="sourceData"
  />
</template>

<script>
import SourceItem from './SourcesList/SourceItem.vue'
import {
  streamableCollection as getStreamableSourcesCollection
} from '*/helpers/formatters/sources'

export default {
  name: 'SourcesList',
  components: {
    SourceItem
  },
  computed: {
    streamableSourcesCollection () {
      return getStreamableSourcesCollection()
    }
  }
}
</script>

<style lang="sass" scoped></style>
