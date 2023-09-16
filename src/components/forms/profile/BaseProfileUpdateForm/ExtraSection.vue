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

      <BaseProfileStatusField
        :status="status"
        @submit="handleSubmit"
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
import BaseProfileStatusField
  from '@/components/fields/profile/BaseProfileStatusField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField,
    BaseProfileStatusField,
    BasePrivateField
  },
  emits: [
    'imageChange',
    'submit'
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
    status () {
      return this.profileInfo.status
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
    },
    handleSubmit () {
      this.$emit(
        'submit'
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
[dir="ltr"]
  .image-field
    margin-right: 1em !important
[dir="rtl"]
  .image-field
    margin-left: 1em !important

.extra-fields
  @extend .flex-full
</style>
