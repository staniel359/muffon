<template>
  <div>
    <i
      class="profile-country-flag"
      :class="iconClassName"
    ></i>

    {{ cityWithCountry }}
  </div>
</template>

<script>
import countries from 'i18n-iso-countries'

export default {
  name: 'CityCountrySection',
  props: {
    city: String,
    country: String
  },
  computed: {
    iconClassName () {
      return `${this.country} flag`
    },
    cityWithCountry () {
      return [
        this.city,
        this.countryFormatted
      ].filter(e => e).join(', ')
    },
    countryFormatted () {
      return countries.getName(
        this.country,
        'en'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-country-flag
  margin-right: 0.25em !important
</style>
