<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseLanguageSelect />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseLanguageSelect from '@/components/selects/BaseLanguageSelect.vue'

export default {
  name: 'LanguageOption',
  components: {
    BaseSettingsOptionHeader,
    BaseLanguageSelect
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.interface.language'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
