<template>
  <BaseFormInputContainer>
    <input
      type="text"
      name="city"
      :placeholder="cityText"
      :value="city"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfileCityField',
  components: {
    BaseFormInputContainer
  },
  props: {
    city: String
  },
  computed: {
    cityText () {
      return this.$t(
        'forms.fields.city'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
