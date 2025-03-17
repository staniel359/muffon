<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseTimezoneSelect />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseTimezoneSelect from '@/components/selects/BaseTimezoneSelect.vue'

export default {
  name: 'TimezoneOption',
  components: {
    BaseSettingsOptionHeader,
    BaseTimezoneSelect
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.interface.timezone'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
