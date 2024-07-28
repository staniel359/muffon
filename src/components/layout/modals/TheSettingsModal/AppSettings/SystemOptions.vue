<template>
  <div class="main-settings-options-block">
    <CacheOption />

    <ClearCacheOption />
  </div>
</template>

<script>
import CacheOption from './SystemOptions/CacheOption.vue'
import ClearCacheOption from './SystemOptions/ClearCacheOption.vue'

export default {
  name: 'SystemOptions',
  components: {
    CacheOption,
    ClearCacheOption
  }
}
</script>

<style lang="sass" scoped></style>
