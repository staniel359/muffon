<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      type="text"
      name="city"
      :placeholder="cityText"
      :value="city"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfileCityField',
  components: {
    BaseInputContainer
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
