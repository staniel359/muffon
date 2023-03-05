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
  audio as audioSources
} from '@/helpers/formatters/sources'

export default {
  name: 'BaseAudioSourcesList',
  components: {
    SourceItem
  },
  computed: {
    sources () {
      return audioSources
    }
  }
}
</script>

<style lang="sass" scoped></style>
