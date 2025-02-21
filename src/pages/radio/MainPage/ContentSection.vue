<template>
  <SearchSegment
    :scope="scope"
    :model-name="modelName"
    @scope-change="handleScopeChange"
    @model-name-change="handleModelNameChange"
    @model-scope-change="handleModelScopeChange"
  />

  <PlayingSegment />

  <PlayerSegment
    :key="key"
    :scope="scope"
    :model-name="modelName"
    :model-scope="modelScope"
  />
</template>

<script>
import SearchSegment from './ContentSection/SearchSegment.vue'
import PlayingSegment from './ContentSection/PlayingSegment.vue'
import PlayerSegment from './ContentSection/PlayerSegment.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'ContentSection',
  components: {
    SearchSegment,
    PlayingSegment,
    PlayerSegment
  },
  props: {},
  data () {
    return {
      key: null,
      modelName: null,
      modelScope: null,
      scope: 'top'
    }
  },
  computed: {
    isTopScope () {
      return (
        this.scope === 'top'
      )
    }
  },
  methods: {
    handleScopeChange (
      value
    ) {
      this.scope = value

      if (this.isTopScope) {
        this.modelScope = null
      }
    },
    handleModelNameChange (
      value
    ) {
      this.modelName = value

      if (value) {
        this.key = generateKey()
      }
    },
    handleModelScopeChange (
      value
    ) {
      this.modelScope = value

      const isRefresh = (
        this.isTopScope ||
          this.modelName
      )

      if (isRefresh) {
        this.key = generateKey()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
