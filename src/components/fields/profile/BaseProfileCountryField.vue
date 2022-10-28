<template>
  <div class="field">
    <BaseCountrySelect
      :selected="value"
      is-form-field
    />
  </div>
</template>

<script>
import BaseCountrySelect from '@/components/selects/BaseCountrySelect.vue'

export default {
  name: 'BaseProfileCountryField',
  components: {
    BaseCountrySelect
  },
  props: {
    value: String
  }
}
</script>

<style lang="sass" scoped></style>
