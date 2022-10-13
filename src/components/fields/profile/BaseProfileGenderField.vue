<template>
  <div class="field">
    <BaseDropdownContainer
      input-type="hidden"
      input-name="gender"
      :header="genderText"
      :selected="value"
      is-form-field
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="item"
        :data-value="option"
        v-text="formatOptionText(option)"
      />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'

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
