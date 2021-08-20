<template>
  <div class="extra-section">
    <BaseImageField
      class="image-field"
      :value="image"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseGenderField :value="gender" />
      <BaseBirthdateField :value="birthdate" />
      <BaseCountryField :value="country" />
      <BaseCityField :value="city" />

      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    image () {
      return this.profileInfo.image_url
    },
    gender () {
      return this.profileInfo.gender
    },
    birthdate () {
      return this.profileInfo.birthdate
    },
    country () {
      return this.profileInfo.country
    },
    city () {
      return this.profileInfo.city
    }
  },
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
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
