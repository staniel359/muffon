<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="resultsFullSizeText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ResultsFullSizeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      searchStore,
      {
        isSearchResultsFullSize: 'isResultsFullSize'
      }
    ),
    resultsFullSizeText () {
      return this.$t(
        'settings.options.app.search.resultsFullSize'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
