<template>
  <SourceItem
    v-for="sourceData in audioSources"
    :key="sourceData.id"
    :source-data="sourceData"
  />
</template>

<script>
import SourceItem from './BaseSourcesList/SourceItem.vue'
import audioSources from '@/helpers/data/audio/sources'

export default {
  name: 'BaseSourcesList',
  components: {
    SourceItem
  },
  computed: {
    audioSources () {
      return audioSources
    }
  }
}
</script>

<style lang="sass" scoped></style>
