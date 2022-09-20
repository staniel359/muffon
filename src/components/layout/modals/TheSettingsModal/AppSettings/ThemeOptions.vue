<template>
  <div class="main-settings-options-block">
    <DarkModeOption />

    <SystemThemeOption />

    <BackgroundOption
      v-if="profileId"
    />

    <TransparencyOption />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
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
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
