<template>
  <div class="main-settings-options-block">
    <SwitchToNewTabOption />

    <CloseOnExitOption />
  </div>
</template>

<script>
import SwitchToNewTabOption from './TabsOptions/SwitchToNewTabOption.vue'
import CloseOnExitOption from './TabsOptions/CloseOnExitOption.vue'

export default {
  name: 'TabsOptions',
  components: {
    SwitchToNewTabOption,
    CloseOnExitOption
  }
}
</script>

<style lang="sass" scoped></style>
