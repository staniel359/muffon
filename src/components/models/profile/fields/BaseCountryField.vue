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
import { mapState } from 'vuex'
import CountryItem from './BaseCountryField/CountryItem.vue'
import countries from 'i18n-iso-countries'
import countriesEn from 'i18n-iso-countries/langs/en.json'
import countriesIt from 'i18n-iso-countries/langs/it.json'
import countriesRu from 'i18n-iso-countries/langs/ru.json'
import { setDropdown, setDropdownValue } from '#/actions/plugins/semantic'

export default {
  name: 'BaseCountryField',
  components: {
    CountryItem
  },
  props: {
    value: String
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    placeholderFormatted () {
      return this.$t(
        'shared.profile.form.fields.country'
      )
    },
    countriesList () {
      return Object.entries(
        countries.getNames(
          this.profileLanguage
        )
      )
    },
    locales () {
      return [
        countriesEn,
        countriesIt,
        countriesRu
      ]
    }
  },
  beforeMount () {
    this.locales.forEach(
      this.registerLocale
    )
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
  },
  methods: {
    registerLocale (locale) {
      countries.registerLocale(
        locale
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
