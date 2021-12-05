<template>
  <div class="extra-section">
    <BaseProfileImageField
      class="image-field"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseProfileGenderField />
      <BaseProfileBirthdateField />
      <BaseProfileCountryField />
      <BaseProfileCityField />

      <div></div>
    </div>
  </div>
</template>

<script>
import BaseProfileImageField
  from '@/models/profile/fields/BaseProfileImageField.vue'
import BaseProfileGenderField
  from '@/models/profile/fields/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '@/models/profile/fields/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '@/models/profile/fields/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '@/models/profile/fields/BaseProfileCityField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseProfileImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField
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
