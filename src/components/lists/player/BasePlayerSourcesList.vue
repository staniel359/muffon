<template>
  <SourceItem
    v-for="sourceData in streamableSourcesCollection"
    :key="sourceData.uuid"
    :source-data="sourceData"
    @select="handleSelect"
  />
</template>

<script>
import SourceItem from './BasePlayerSourcesList/SourceItem.vue'
import {
  streamableCollection as getStreamableSourcesCollection
} from '*/helpers/formatters/sources'

export default {
  name: 'BasePlayerSourcesList',
  components: {
    SourceItem
  },
  emits: [
    'select'
  ],
  computed: {
    streamableSourcesCollection () {
      return getStreamableSourcesCollection()
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
