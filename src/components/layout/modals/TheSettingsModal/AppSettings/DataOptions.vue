<template>
  <div class="main-settings-options-block">
    <ClearCacheOption />

    <ClearSearchHistoryOption />
  </div>
</template>

<script>
import ClearCacheOption from './DataOptions/ClearCacheOption.vue'
import ClearSearchHistoryOption
  from './DataOptions/ClearSearchHistoryOption.vue'

export default {
  name: 'DataOptions',
  components: {
    ClearCacheOption,
    ClearSearchHistoryOption
  }
}
</script>

<style lang="sass" scoped></style>
