<template>
  <div class="main-settings-options-block">
    <DarkModeOption />

    <SystemThemeOption />

    <BackgroundOption />

    <TransparencyOption />
  </div>
</template>

<script>
import DarkModeOption from './ThemeOptions/DarkModeOption.vue'
import SystemThemeOption from './ThemeOptions/SystemThemeOption.vue'
import BackgroundOption from './ThemeOptions/BackgroundOption.vue'
import TransparencyOption from './ThemeOptions/TransparencyOption.vue'

export default {
  name: 'ThemeOptions',
  components: {
    DarkModeOption,
    SystemThemeOption,
    BackgroundOption,
    TransparencyOption
  }
}
</script>

<style lang="sass" scoped></style>
