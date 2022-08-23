<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="tabsText"
      is-horizontal
    />

    <div>
      <SwitchToNewTabOption />

      <CloseOnExitOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import SwitchToNewTabOption from './TabsOptions/SwitchToNewTabOption.vue'
import CloseOnExitOption from './TabsOptions/CloseOnExitOption.vue'

export default {
  name: 'TabsOptions',
  components: {
    BaseDivider,
    SwitchToNewTabOption,
    CloseOnExitOption
  },
  computed: {
    tabsText () {
      return this.$t(
        'settings.sections.app.tabs'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
