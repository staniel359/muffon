<template>
  <div
    :class="[
      'ui segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
    <SearchSegment
      :scope="scope"
      :modelName="modelName"
      :modelScope="modelScope"
      @scopeChange="handleScopeChange"
      @modelNameChange="handleModelNameChange"
      @modelScopeChange="handleModelScopeChange"
    />

    <PlayerSegment
      v-if="scope && modelScope"
      :key="key"
      :scope="scope"
      :modelName="modelName"
      :modelScope="modelScope"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchSegment from './RadioPage/SearchSegment.vue'
import PlayerSegment from './RadioPage/PlayerSegment.vue'
import formatRadioPageNavigation from '#/formatters/navigation/radio'
import formatRadioPageTab from '#/formatters/tabs/radio'
import { updateTab } from '#/actions'
import { generateKey } from '#/utils'

export default {
  name: 'RadioPage',
  components: {
    SearchSegment,
    PlayerSegment
  },
  data () {
    return {
      key: null,
      scope: null,
      modelName: null,
      modelScope: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    navigationSections () {
      return formatRadioPageNavigation()
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    handleScopeChange (value) {
      this.scope = value
    },
    handleModelNameChange (value) {
      this.modelName = value

      this.key = generateKey()
    },
    handleModelScopeChange (value) {
      this.modelScope = value

      this.key = generateKey()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatRadioPageTab()
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
