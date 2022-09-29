<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
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
  </div>
</template>

<script>
import SearchSegment from './RadioPage/SearchSegment.vue'
import PlayingSegment from './RadioPage/PlayingSegment.vue'
import PlayerSegment from './RadioPage/PlayerSegment.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  radio as formatRadioPageNavigation
} from '@/helpers/formatters/navigation'
import formatRadioPageTab from '@/helpers/formatters/tabs/radio'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'RadioPage',
  components: {
    SearchSegment,
    PlayingSegment,
    PlayerSegment
  },
  mixins: [
    navigationMixin
  ],
  data () {
    return {
      key: null,
      modelName: null,
      modelScope: null,
      scope: 'top'
    }
  },
  computed: {
    navigationSections () {
      return formatRadioPageNavigation()
    },
    tabData () {
      return formatRadioPageTab()
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    handleScopeChange (
      value
    ) {
      this.scope = value

      if (this.scope === 'top') {
        this.modelScope = null
      }
    },
    handleModelNameChange (
      value
    ) {
      this.modelName = value

      this.key = generateKey()
    },
    handleModelScopeChange (
      value
    ) {
      this.modelScope = value

      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
