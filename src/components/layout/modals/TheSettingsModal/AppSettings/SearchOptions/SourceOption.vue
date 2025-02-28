<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <SourceSelect />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import SourceSelect from './SourceOption/SourceSelect.vue'

export default {
  name: 'SourceOption',
  components: {
    BaseSettingsOptionHeader,
    SourceSelect
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.search.source'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
