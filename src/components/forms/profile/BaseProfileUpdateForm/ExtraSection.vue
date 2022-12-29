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
        :gender="gender"
      />

      <BaseProfileBirthdateField
        :birthdate="birthdate"
      />

      <BaseProfileCountryField
        :country="country"
      />

      <BaseProfileCityField
        :city="city"
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
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseProfileGenderField
  from '@/components/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '@/components/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '@/components/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '@/components/fields/profile/BaseProfileCityField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'

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
      profileStore,
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
