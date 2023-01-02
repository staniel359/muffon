<template>
  <div class="source-select-container">
    <BaseDropdownContainer
      class="main-source-select"
      :selected="source"
      @select="handleSelect"
    >
      <BaseStreamableSourcesList />
    </BaseDropdownContainer>

    <BaseClearButton
      v-if="isRenderClearButton"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import BaseStreamableSourcesList
  from '@/components/lists/sources/BaseStreamableSourcesList.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    BaseStreamableSourcesList,
    BaseClearButton
  },
  props: {
    source: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerAudioSources: 'audioSources'
      }
    ),
    isRenderClearButton () {
      return (
        this.playerAudioSources.length > 1
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      const sources = [
        ...this.playerAudioSources
      ]

      sources[
        this.index
      ] = value

      updateGlobalStore(
        {
          'player.audioSources': sources
        }
      )
    },
    handleClearButtonClick () {
      const sources = [
        ...this.playerAudioSources.filter(
          this.isMatchedSource
        )
      ]

      updateGlobalStore(
        {
          'player.audioSources': sources
        }
      )
    },
    isMatchedSource (
      _,
      index
    ) {
      return (
        index !== this.index
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.source-select-container
  @extend .d-flex, .align-items-center
  margin-bottom: 0.75em

::v-deep(.menu)
  max-height: 200px !important
</style>
