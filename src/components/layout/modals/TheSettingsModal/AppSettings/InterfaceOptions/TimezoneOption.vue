<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="timezoneText"
      />

      <BaseTimezoneSelect />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTimezoneSelect from '@/components/selects/BaseTimezoneSelect.vue'

export default {
  name: 'TimezoneOption',
  components: {
    BaseHeader,
    BaseTimezoneSelect
  },
  computed: {
    timezoneText () {
      return this.$t(
        'settings.options.app.interface.timezone'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
