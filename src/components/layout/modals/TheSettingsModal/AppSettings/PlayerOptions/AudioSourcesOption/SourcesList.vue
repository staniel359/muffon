<template>
  <SourceSelect
    v-for="(sourceData, index) in playerAudioSourcesCollection"
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
        playerAudioSources: 'audioSources'
      }
    ),
    playerAudioSourcesCollection () {
      return formatCollection(
        this.playerAudioSources
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
