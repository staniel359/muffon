<template>
  <div class="field">
    <BaseCountriesDropdown
      :selected="value"
      is-form-field
    />
  </div>
</template>

<script>
import BaseCountriesDropdown
  from '@/components/dropdowns/BaseCountriesDropdown.vue'

export default {
  name: 'BaseProfileCountryField',
  components: {
    BaseCountriesDropdown
  },
  props: {
    value: String
  }
}
</script>

<style lang="sass" scoped></style>
