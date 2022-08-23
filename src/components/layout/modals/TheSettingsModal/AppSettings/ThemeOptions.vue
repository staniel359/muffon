<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="themeText"
      is-horizontal
    />

    <div>
      <DarkModeOption />

      <SystemThemeOption />

      <BackgroundOption />

      <TransparencyOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import DarkModeOption from './ThemeOptions/DarkModeOption.vue'
import SystemThemeOption from './ThemeOptions/SystemThemeOption.vue'
import BackgroundOption from './ThemeOptions/BackgroundOption.vue'
import TransparencyOption from './ThemeOptions/TransparencyOption.vue'

export default {
  name: 'ThemeOptions',
  components: {
    BaseDivider,
    DarkModeOption,
    SystemThemeOption,
    BackgroundOption,
    TransparencyOption
  },
  computed: {
    themeText () {
      return this.$t(
        'settings.sections.app.theme'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
