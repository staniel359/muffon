<template>
  <div class="extra-section">
    <BaseProfileImageField
      class="image-field"
      :value="imageData.medium"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseProfileGenderField
        :value="gender"
      />
      <BaseProfileBirthdateField
        :value="birthdate"
      />
      <BaseProfileCountryField
        :value="country"
      />
      <BaseProfileCityField
        :value="city"
      />

      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    imageData () {
      return this.profileInfo.image
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
  width: 120px
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
