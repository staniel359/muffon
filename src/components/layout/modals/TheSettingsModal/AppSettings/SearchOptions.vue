<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <ScopeOption />

    <ResultsFullSizeOption />

    <ClearHistoryOption />
  </div>
</template>

<script>
import SourceOption from './SearchOptions/SourceOption.vue'
import ScopeOption from './SearchOptions/ScopeOption.vue'
import ResultsFullSizeOption from './SearchOptions/ResultsFullSizeOption.vue'
import ClearHistoryOption from './SearchOptions/ClearHistoryOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    SourceOption,
    ScopeOption,
    ResultsFullSizeOption,
    ClearHistoryOption
  }
}
</script>

<style lang="sass" scoped></style>
