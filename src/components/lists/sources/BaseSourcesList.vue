<template>
  <SourceItem
    v-for="sourceData in sources"
    :key="sourceData.id"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './BaseSourcesList/SourceItem.vue'
import sources from '@/helpers/data/sources'

export default {
  name: 'BaseSourcesList',
  components: {
    SourceItem
  },
  computed: {
    sources () {
      return sources
    }
  }
}
</script>

<style lang="sass" scoped></style>
