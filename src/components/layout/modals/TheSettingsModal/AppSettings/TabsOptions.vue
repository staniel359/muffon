<template>
  <div class="main-settings-options-block">
    <SwitchToNewTabOption />

    <CloseOnQuitOption />
  </div>
</template>

<script>
import SwitchToNewTabOption from './TabsOptions/SwitchToNewTabOption.vue'
import CloseOnQuitOption from './TabsOptions/CloseOnQuitOption.vue'

export default {
  name: 'TabsOptions',
  components: {
    SwitchToNewTabOption,
    CloseOnQuitOption
  }
}
</script>

<style lang="sass" scoped></style>
