<template>
  <BaseDropdownContainer
    ref="dropdown"
    class="search"
    :selected="selected"
    :header="countryText"
    :is-form-field="isFormField"
    @select="handleSelect"
  >
    <template
      v-if="isFormField"
      #input
    >
      <input
        type="hidden"
        name="country"
      >
    </template>

    <template #default>
      <CountriesList />
    </template>
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
import CountriesList from './BaseCountriesDropdown/CountriesList.vue'

export default {
  name: 'BaseCountriesDropdown',
  components: {
    BaseDropdownContainer,
    CountriesList
  },
  props: {
    selected: String,
    isFormField: Boolean
  },
  emits: [
    'select'
  ],
  computed: {
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
    reset () {
      this.$refs
        .dropdown
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
