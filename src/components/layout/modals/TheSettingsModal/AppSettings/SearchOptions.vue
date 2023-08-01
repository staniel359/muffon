<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <ScopeOption />

    <ClearHistoryOption />
  </div>
</template>

<script>
import SourceOption from './SearchOptions/SourceOption.vue'
import ScopeOption from './SearchOptions/ScopeOption.vue'
import ClearHistoryOption from './SearchOptions/ClearHistoryOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    SourceOption,
    ScopeOption,
    ClearHistoryOption
  }
}
</script>

<style lang="sass" scoped></style>
