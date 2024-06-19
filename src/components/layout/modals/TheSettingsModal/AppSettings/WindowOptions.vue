<template>
  <div class="main-settings-options-block">
    <MaximizeOption />

    <ExitOption />

    <TrayOption />
  </div>
</template>

<script>
import MaximizeOption from './WindowOptions/MaximizeOption.vue'
import ExitOption from './WindowOptions/ExitOption.vue'
import TrayOption from './WindowOptions/TrayOption.vue'

export default {
  name: 'WindowOptions',
  components: {
    MaximizeOption,
    ExitOption,
    TrayOption
  }
}
</script>

<style lang="sass" scoped></style>
