<template>
  <CountryItem
    v-for="countryData in countriesList"
    :key="countryData[0]"
    :country-data="countryData"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import countries from 'i18n-iso-countries'
import CountryItem from './CountriesList/CountryItem.vue'

export default {
  name: 'CountriesList',
  components: {
    CountryItem
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    countriesList () {
      return Object.entries(
        countries.getNames(
          this.profileLanguage
        )
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
