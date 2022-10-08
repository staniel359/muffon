<template>
  <div class="main-country-select-section">
    <BaseCountriesDropdown
      :key="key"
      class="country-select"
      :selected="country"
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
  from '@/components/dropdowns/BaseCountriesDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseCountrySelectSection',
  components: {
    BaseCountriesDropdown,
    BaseClearButton
  },
  props: {
    country: String
  },
  emits: [
    'select'
  ],
  data () {
    return {
      key: null
    }
  },
  watch: {
    country: 'handleCountryChange'
  },
  methods: {
    handleCountrySelect (
      value
    ) {
      this.select(
        value
      )
    },
    handleClearButtonClick () {
      this.select(
        null
      )
    },
    handleCountryChange (
      value
    ) {
      if (!value) {
        this.key = generateKey()
      }
    },
    select (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.country-select
  width: 220px
</style>
