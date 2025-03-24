<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseDarkModeToggle />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseDarkModeToggle from '@/components/toggles/BaseDarkModeToggle.vue'

export default {
  name: 'DarkModeOption',
  components: {
    BaseSettingsOptionHeader,
    BaseDarkModeToggle
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.theme.dark'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
