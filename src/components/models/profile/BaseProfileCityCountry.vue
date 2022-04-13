<template>
  <div v-if="city || country">
    <i
      v-if="country"
      class="profile-country-flag"
      :class="iconClassName"
    />

    {{ cityWithCountryFormatted }}
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import countries from 'i18n-iso-countries'

export default {
  name: 'BaseProfileCityCountry',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    iconClassName () {
      return `${this.country} flag`
    },
    country () {
      return this.profileData.country
    },
    cityWithCountryFormatted () {
      return [
        this.city,
        this.countryName
      ].filter(
        e => e
      ).join(
        ', '
      )
    },
    city () {
      return this.profileData.city
    },
    countryName () {
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
