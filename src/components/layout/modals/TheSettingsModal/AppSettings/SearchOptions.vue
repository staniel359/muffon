<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <ScopeOption />

    <ResultsFullSizeOption />
  </div>
</template>

<script>
import SourceOption from './SearchOptions/SourceOption.vue'
import ScopeOption from './SearchOptions/ScopeOption.vue'
import ResultsFullSizeOption from './SearchOptions/ResultsFullSizeOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    SourceOption,
    ScopeOption,
    ResultsFullSizeOption
  }
}
</script>

<style lang="sass" scoped></style>
