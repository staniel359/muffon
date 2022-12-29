<template>
  <div class="field main-field">
    <BaseDropdown
      ref="dropdown"
      input-type="hidden"
      input-name="gender"
      :header="genderText"
      :options="optionsFormatted"
      :selected="gender"
      is-form-field
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="value"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'BaseProfileGenderField',
  components: {
    BaseDropdown,
    BaseClearButton
  },
  props: {
    gender: String
  },
  data () {
    return {
      value: null,
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
  mounted () {
    this.value = this.gender
  },
  methods: {
    handleSelect (
      value
    ) {
      this.value = value
    },
    handleClearButtonClick () {
      this.reset()

      this.value = null
    },
    formatOption (
      option
    ) {
      const name =
        this.$t(
          `forms.fields.genders.${option}`
        )

      return {
        id: option,
        name
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
