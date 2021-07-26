<template>
  <div class="extra-section">
    <BaseAvatarField
      class="avatar-field"
      @change="handleAvatarChange"
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
import BaseAvatarField from '@/models/profile/fields/BaseAvatarField.vue'
import BaseGenderField from '@/models/profile/fields/BaseGenderField.vue'
import BaseBirthdateField from '@/models/profile/fields/BaseBirthdateField.vue'
import BaseCountryField from '@/models/profile/fields/BaseCountryField.vue'
import BaseCityField from '@/models/profile/fields/BaseCityField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseAvatarField,
    BaseGenderField,
    BaseBirthdateField,
    BaseCountryField,
    BaseCityField
  },
  emits: [
    'avatarChange'
  ],
  methods: {
    handleAvatarChange (value) {
      this.$emit(
        'avatarChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  @extend .d-flex

.avatar-field
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
