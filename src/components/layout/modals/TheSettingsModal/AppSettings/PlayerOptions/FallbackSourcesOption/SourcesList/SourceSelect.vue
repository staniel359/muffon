<template>
  <div class="source-select-container">
    <BaseDropdownContainer
      class="main-source-select"
      :selected="source"
    >
      <BasePlayerSourcesList
        @select="handleSelect"
      />
    </BaseDropdownContainer>

    <BaseClearButton
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
import BasePlayerSourcesList
  from '@/components/lists/player/BasePlayerSourcesList.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'SourceSelect',
  components: {
    BaseDropdownContainer,
    BasePlayerSourcesList,
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
      'player',
      {
        playerFallbackSources: 'fallbackSources'
      }
    )
  },
  methods: {
    handleSelect (
      value
    ) {
      const sources = [
        ...this.playerFallbackSources
      ]

      sources[this.index] = value

      updateGlobalStore(
        {
          'player.fallbackSources': sources
        }
      )
    },
    handleClearButtonClick () {
      const sources = [
        ...this.playerFallbackSources.filter(
          this.isMatchedSource
        )
      ]

      updateGlobalStore(
        {
          'player.fallbackSources': sources
        }
      )
    },
    isMatchedSource (
      _,
      index
    ) {
      return index !== this.index
    }
  }
}
</script>

<style lang="sass" scoped>
.source-select-container
  @extend .d-flex, .align-items-center
  margin-bottom: 0.5em

::v-deep(.menu)
  max-height: 200px !important
</style>
