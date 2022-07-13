<template>
  <div class="field">
    <BaseDropdownContainer
      :header="genderText"
      :selected="value"
      is-form-field
    >
      <template #input>
        <input
          type="hidden"
          name="gender"
        >
      </template>

      <template #default>
        <div
          v-for="option in options"
          :key="option"
          class="item"
          :data-value="option"
          v-text="formatOptionText(option)"
        />
      </template>
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'

export default {
  name: 'BaseProfileGenderField',
  components: {
    BaseDropdownContainer
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
    }
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
