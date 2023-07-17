<template>
  <div class="main-settings-options-block">
    <ClearCacheOption />
  </div>
</template>

<script>
import ClearCacheOption from './OtherOptions/ClearCacheOption.vue'

export default {
  name: 'OtherOptions',
  components: {
    ClearCacheOption
  }
}
</script>

<style lang="sass" scoped></style>
