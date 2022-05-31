<template>
  <div class="country-select-block">
    <BaseCountriesDropdown
      ref="dropdown"
      class="country-select"
      @select="handleCountrySelect"
    />

    <BaseClearButton
      v-if="country"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseCountriesDropdown
  from '*/components/dropdowns/BaseCountriesDropdown.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'CountrySelectBlock',
  components: {
    BaseCountriesDropdown,
    BaseClearButton
  },
  props: {
    country: String
  },
  emits: [
    'select',
    'clearButtonClick'
  ],
  methods: {
    handleCountrySelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    handleClearButtonClick () {
      this.$refs
        .dropdown
        .reset()

      this.$emit(
        'clearButtonClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.country-select-block
  @extend .d-flex, .align-items-center

.country-select
  width: 220px
</style>
