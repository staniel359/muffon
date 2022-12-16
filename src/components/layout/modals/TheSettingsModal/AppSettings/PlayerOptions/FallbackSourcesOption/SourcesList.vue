<template>
  <SourceSelect
    v-for="(sourceData, index) in playerFallbackSourcesCollection"
    :key="sourceData.uuid"
    :source="sourceData.name"
    :index="index"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import SourceSelect from './SourcesList/SourceSelect.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'SourcesList',
  components: {
    SourceSelect
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerFallbackSources: 'fallbackSources'
      }
    ),
    playerFallbackSourcesCollection () {
      return formatCollection(
        this.playerFallbackSources
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
