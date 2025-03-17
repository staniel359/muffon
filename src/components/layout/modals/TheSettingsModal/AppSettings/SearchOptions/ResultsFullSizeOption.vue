<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="search.isResultsFullSize"
        :is-checked="isSearchResultsFullSize"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import searchStore from '@/stores/search'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ResultsFullSizeOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      searchStore,
      {
        isSearchResultsFullSize: 'isResultsFullSize'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.search.resultsFullSize'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
