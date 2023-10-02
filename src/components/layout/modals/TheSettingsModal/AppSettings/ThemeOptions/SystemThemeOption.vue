<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="systemThemeText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'SystemThemeOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithSystemTheme'
      ]
    ),
    systemThemeText () {
      return this.$t(
        'settings.options.app.theme.system'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
