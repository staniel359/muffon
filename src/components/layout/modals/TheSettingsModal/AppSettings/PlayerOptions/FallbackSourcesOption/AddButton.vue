<template>
  <BaseButton
    v-if="isRender"
    class="basic circular compact add-button"
    icon="plus"
    :text="addText"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  streamable as getStreamableSources
} from '@/helpers/formatters/sources'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'AddButton',
  components: {
    BaseButton
  },
  data () {
    return {
      defaultFallbackSource: 'vk'
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerFallbackSources: 'fallbackSources'
      }
    ),
    isRender () {
      return (
        this.fallbackSourcesCount <
          this.sourcesCount - 1
      )
    },
    fallbackSourcesCount () {
      return this.playerFallbackSources.length
    },
    sourcesCount () {
      return getStreamableSources().length
    },
    addText () {
      return this.$t(
        'actions.add'
      )
    }
  },
  methods: {
    handleClick () {
      const sources = [
        ...this.playerFallbackSources,
        this.defaultFallbackSource
      ]

      updateGlobalStore(
        {
          'player.fallbackSources': sources
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.add-button
  align-self: flex-end
</style>
