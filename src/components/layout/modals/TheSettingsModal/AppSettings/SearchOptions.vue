<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <ScopeOption />

    <ClearOption />
  </div>
</template>

<script>
import SourceOption from './SearchOptions/SourceOption.vue'
import ScopeOption from './SearchOptions/ScopeOption.vue'
import ClearOption from './SearchOptions/ClearOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    SourceOption,
    ScopeOption,
    ClearOption
  }
}
</script>

<style lang="sass" scoped></style>
