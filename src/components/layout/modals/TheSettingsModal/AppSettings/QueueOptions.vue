<template>
  <div class="main-settings-options-block">
    <AutoplayOption />

    <ClearOption />
  </div>
</template>

<script>
import AutoplayOption from './QueueOptions/AutoplayOption.vue'
import ClearOption from './QueueOptions/ClearOption.vue'

export default {
  name: 'QueueOptions',
  components: {
    AutoplayOption,
    ClearOption
  }
}
</script>

<style lang="sass" scoped></style>
