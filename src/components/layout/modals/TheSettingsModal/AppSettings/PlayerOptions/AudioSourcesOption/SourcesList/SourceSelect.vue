<template>
  <div class="main-list-bottom-section middle-aligned">
    <BaseDropdownContainer
      class="main-source-select"
      :selected="source"
      @select="handleSelect"
    >
      <BaseAudioSourcesList />
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
import BaseAudioSourcesList
  from '@/components/lists/sources/BaseAudioSourcesList.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    BaseAudioSourcesList,
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

<style lang="sass" scoped></style>
