<template>
  <div class="extra-section">
    <BaseImageField
      class="image-field"
      model="profile"
      :value="imageData?.medium"
      is-circular
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

      <BasePrivateField
        model="profile"
        :is-checked="isPrivate"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseProfileGenderField
  from '*/components/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '*/components/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '*/components/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '*/components/fields/profile/BaseProfileCityField.vue'
import BasePrivateField from '*/components/fields/BasePrivateField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField,
    BasePrivateField
  },
  emits: [
    'imageChange'
  ],
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
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
    },
    isPrivate () {
      return this.profileInfo.private
    }
  },
  methods: {
    handleImageChange (
      value
    ) {
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
