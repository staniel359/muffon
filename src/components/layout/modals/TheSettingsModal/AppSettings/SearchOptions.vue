<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <ScopeOption />
  </div>
</template>

<script>
import SourceOption from './SearchOptions/SourceOption.vue'
import ScopeOption from './SearchOptions/ScopeOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    SourceOption,
    ScopeOption
  }
}
</script>

<style lang="sass" scoped></style>
