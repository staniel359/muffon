<template>
  <div>
    <i
      v-if="country"
      class="profile-country-flag"
      :class="iconClassName"
    ></i>

    {{ cityWithCountry }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import countries from 'i18n-iso-countries'

export default {
  name: 'BaseProfileCityCountry',
  props: {
    city: String,
    country: String
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
        this.profileLanguage
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-country-flag
  margin-right: 0.25em !important
</style>
