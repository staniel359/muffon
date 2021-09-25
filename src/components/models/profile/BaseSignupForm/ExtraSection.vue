<template>
  <div class="extra-section">
    <BaseImageField
      class="image-field"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseGenderField />
      <BaseBirthdateField />
      <BaseCountryField />
      <BaseCityField />

      <div></div>
    </div>
  </div>
</template>

<script>
import BaseImageField from '@/models/profile/fields/BaseImageField.vue'
import BaseGenderField from '@/models/profile/fields/BaseGenderField.vue'
import BaseBirthdateField from '@/models/profile/fields/BaseBirthdateField.vue'
import BaseCountryField from '@/models/profile/fields/BaseCountryField.vue'
import BaseCityField from '@/models/profile/fields/BaseCityField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseImageField,
    BaseGenderField,
    BaseBirthdateField,
    BaseCountryField,
    BaseCityField
  },
  emits: [
    'imageChange'
  ],
  methods: {
    handleImageChange (value) {
      this.$emit(
        'imageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  @extend .d-flex

.image-field
  width: 120px
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
