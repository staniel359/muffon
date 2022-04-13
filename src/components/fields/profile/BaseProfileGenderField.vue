<template>
  <div class="field">
    <div
      ref="dropdown"
      class="ui selection dropdown"
    >
      <input
        type="hidden"
        name="gender"
      >

      <div
        class="default text"
        v-text="genderText"
      />

      <i class="dropdown icon" />

      <div class="menu">
        <div
          v-for="optionData in optionsCollection"
          :key="optionData.uuid"
          class="item"
          :data-value="optionData.name"
          v-text="formatOptionText(optionData.name)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  setDropdownValue
} from '*/helpers/actions/plugins/semantic'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseProfileGenderField',
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
    optionsCollection () {
      return formatCollection(
        this.options
      )
    }
  },
  mounted () {
    setDropdownValue(
      this.$refs.dropdown,
      this.value
    )
  },
  methods: {
    formatOptionText (
      option
    ) {
      return this.$t(
        `forms.fields.genders.${option}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
