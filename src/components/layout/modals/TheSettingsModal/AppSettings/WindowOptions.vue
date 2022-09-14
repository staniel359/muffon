<template>
  <div class="main-settings-options-block">
    <MaximizeOption />

    <ExitOption />
  </div>
</template>

<script>
import MaximizeOption from './WindowOptions/MaximizeOption.vue'
import ExitOption from './WindowOptions/ExitOption.vue'

export default {
  name: 'WindowOptions',
  components: {
    MaximizeOption,
    ExitOption
  }
}
</script>

<style lang="sass" scoped></style>
