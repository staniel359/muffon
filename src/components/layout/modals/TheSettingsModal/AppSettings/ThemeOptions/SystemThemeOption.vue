<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="layout.isWithSystemTheme"
        :is-checked="isWithSystemTheme"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SystemThemeOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithSystemTheme'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.theme.system'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
