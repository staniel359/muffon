<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <ScopeSelect />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import ScopeSelect from './ScopeOption/ScopeSelect.vue'

export default {
  name: 'ScopeOption',
  components: {
    BaseSettingsOptionHeader,
    ScopeSelect
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.search.scope'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
