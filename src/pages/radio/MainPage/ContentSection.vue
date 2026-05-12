<template>
  <SearchSegment
    :scope="scope"
    :model-name="modelName"
    :is-scope-with-model="isScopeWithModel"
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
    :is-scope-with-model="isScopeWithModel"
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
      scope: 'top',
      scopesWithModel: [
        'tag',
        'artist'
      ]
    }
  },
  computed: {
    isRefresh () {
      if (this.isScopeWithModel) {
        return !!this.modelName
      } else {
        return true
      }
    },
    isScopeWithModel () {
      return this.scopesWithModel.includes(
        this.scope
      )
    }
  },
  methods: {
    handleScopeChange (
      value
    ) {
      this.scope = value

      if (!this.isScopeWithModel) {
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

      if (this.isRefresh) {
        this.key = generateKey()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
