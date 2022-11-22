<template>
  <BaseDropdown
    ref="dropdown"
    class="search"
    input-type="hidden"
    input-name="country"
    :options="countriesFormatted"
    :selected="selected"
    :header="countryText"
    :is-form-field="isFormField"
    is-flag-icon
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import countries from 'i18n-iso-countries'

export default {
  name: 'BaseCountrySelect',
  components: {
    BaseDropdown
  },
  props: {
    selected: String,
    isFormField: Boolean
  },
  emits: [
    'select'
  ],
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    countriesFormatted () {
      return Object.entries(
        this.countriesList
      ).map(
        this.formatCountry
      )
    },
    countriesList () {
      return countries.getNames(
        this.profileLanguage,
        {
          select: 'all'
        }
      )
    },
    countryText () {
      return this.$t(
        this.countryTextKey
      )
    },
    countryTextKey () {
      if (this.isFormField) {
        return 'forms.fields.country'
      } else {
        return 'select.country'
      }
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    formatCountry (
      countryData
    ) {
      const [
        id,
        names
      ] = countryData

      const name =
        names.at(
          -1
        )

      return {
        id: id.toLowerCase(),
        name,
        icon: id.toLowerCase()
      }
    },
    reset () {
      this.$refs
        .dropdown
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
