<template>
  <BaseCountrySelectSection
    class="field main-field"
    :country="country"
    is-form-field
  />
</template>

<script>
import BaseCountrySelectSection
  from '@/components/sections/BaseCountrySelectSection.vue'

export default {
  name: 'BaseProfileCountryField',
  components: {
    BaseCountrySelectSection
  },
  props: {
    country: String
  }
}
</script>

<style lang="sass" scoped></style>
