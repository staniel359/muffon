<template>
  <div
    v-if="city || country"
  >
    <i
      v-if="country"
      class="small flag"
      :class="country"
    />

    <span
      class="main-header"
      v-text="cityWithCountryFormatted"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
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
      return this.countryNames?.at(
        -1
      )
    },
    countryNames () {
      return countries.getName(
        this.country,
        this.profileLanguage,
        {
          select: 'all'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
