<template>
  <div class="field">
    <div
      class="ui fluid search selection dropdown"
      ref="dropdown"
    >
      <input
        type="hidden"
        name="country"
      >

      <div class="default text">
        {{ countryText }}
      </div>
      <i class="dropdown icon"></i>

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
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      { forceSelection: false }
    )

    setDropdownValue(
      this.$refs.dropdown,
      this.value
    )
  }
}
</script>

<style lang="sass" scoped></style>
