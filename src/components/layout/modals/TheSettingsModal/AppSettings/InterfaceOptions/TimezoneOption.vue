<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="timezoneText"
    />

    <BaseTimezoneDropdown />
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import BaseTimezoneDropdown
  from '*/components/dropdowns/BaseTimezoneDropdown.vue'

export default {
  name: 'TimezoneOption',
  components: {
    BaseHeader,
    BaseTimezoneDropdown
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
