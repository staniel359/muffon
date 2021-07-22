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
        {{ placeholderFormatted }}
      </div>
      <i class="dropdown icon"></i>

      <div class="menu">
        <CountryItem
          v-for="countryData in countriesList"
          :key="countryData[0]"
          :countryData="countryData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CountryItem from './CountryField/CountryItem.vue'
import countries from 'i18n-iso-countries'
import countriesEn from 'i18n-iso-countries/langs/en.json'
import { localize } from '#/actions/plugins/i18n'
import { setDropdown } from '#/actions/plugins/semantic'

export default {
  name: 'CountryField',
  components: {
    CountryItem
  },
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.country'
      )
    },
    countriesList () {
      return Object.entries(
        countries.getNames('en')
      )
    }
  },
  beforeMount () {
    countries.registerLocale(
      countriesEn
    )
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      { forceSelection: false }
    )
  }
}
</script>

<style lang="sass" scoped></style>
