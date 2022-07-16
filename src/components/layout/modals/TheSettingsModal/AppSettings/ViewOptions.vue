<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="viewText"
      is-horizontal
    />

    <div>
      <LanguageOption />

      <DarkModeOption />

      <SwitchToNewTabOption />

      <InfiniteScrollOption />

      <BackgroundOption />

      <TransparencyOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import LanguageOption from './ViewOptions/LanguageOption.vue'
import DarkModeOption from './ViewOptions/DarkModeOption.vue'
import SwitchToNewTabOption from './ViewOptions/SwitchToNewTabOption.vue'
import InfiniteScrollOption from './ViewOptions/InfiniteScrollOption.vue'
import BackgroundOption from './ViewOptions/BackgroundOption.vue'
import TransparencyOption from './ViewOptions/TransparencyOption.vue'

export default {
  name: 'ViewOptions',
  components: {
    BaseDivider,
    LanguageOption,
    DarkModeOption,
    SwitchToNewTabOption,
    InfiniteScrollOption,
    BackgroundOption,
    TransparencyOption
  },
  computed: {
    viewText () {
      return this.$t(
        'settings.sections.app.view'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
