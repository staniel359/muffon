<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-page-container'
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
import SearchSegment from './MainPage/SearchSegment.vue'
import PlayingSegment from './MainPage/PlayingSegment.vue'
import PlayerSegment from './MainPage/PlayerSegment.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  radio as formatRadioPageNavigation
} from '@/helpers/formatters/navigation'
import formatRadioPageTab from '@/helpers/formatters/tabs/radio'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'MainPage',
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
    },
    isTopScope () {
      return (
        this.scope === 'top'
      )
    }
  },
  mounted () {
    this.setNavigation()

    this.isRefreshNavigation = true
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
