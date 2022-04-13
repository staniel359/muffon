<template>
  <div class="field">
    <div
      ref="dropdown"
      class="ui fluid search selection dropdown"
    >
      <input
        type="hidden"
        name="country"
      >

      <div
        class="default text"
        v-text="countryText"
      />

      <i class="dropdown icon" />

      <CountriesList />
    </div>
  </div>
</template>

<script>
import CountriesList from './BaseProfileCountryField/CountriesList.vue'
import {
  setDropdown,
  setDropdownValue
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseProfileCountryField',
  components: {
    CountriesList
  },
  props: {
    value: String
  },
  computed: {
    countryText () {
      return this.$t(
        'forms.fields.country'
      )
    },
    dropdownOptions () {
      return {
        forceSelection: false
      }
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      this.dropdownOptions
    )

    setDropdownValue(
      this.$refs.dropdown,
      this.value
    )
  }
}
</script>

<style lang="sass" scoped></style>
