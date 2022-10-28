<template>
  <div class="field">
    <BaseDropdown
      input-type="hidden"
      input-name="gender"
      :header="genderText"
      :options="optionsFormatted"
      :selected="value"
      is-form-field
    />
  </div>
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'

export default {
  name: 'BaseProfileGenderField',
  components: {
    BaseDropdown
  },
  props: {
    value: String
  },
  data () {
    return {
      options: [
        'male',
        'female',
        'other'
      ]
    }
  },
  computed: {
    genderText () {
      return this.$t(
        'forms.fields.gender'
      )
    },
    optionsFormatted () {
      return this.options.map(
        this.formatOption
      )
    }
  },
  methods: {
    formatOption (
      option
    ) {
      return {
        id: option,
        name: this.$t(
          `forms.fields.genders.${option}`
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
