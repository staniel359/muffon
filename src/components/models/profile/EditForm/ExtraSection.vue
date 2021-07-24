<template>
  <div class="extra-section">
    <AvatarField
      class="avatar-field"
      :value="avatar"
      @change="handleAvatarChange"
    />

    <div class="extra-fields">
      <GenderField :value="gender" />
      <BirthdateField :value="birthdate" />
      <CountryField :value="country" />
      <CityField :value="city" />

      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AvatarField from '@/models/profile/fields/AvatarField.vue'
import GenderField from '@/models/profile/fields/GenderField.vue'
import BirthdateField from '@/models/profile/fields/BirthdateField.vue'
import CountryField from '@/models/profile/fields/CountryField.vue'
import CityField from '@/models/profile/fields/CityField.vue'

export default {
  name: 'ExtraSection',
  components: {
    AvatarField,
    GenderField,
    BirthdateField,
    CountryField,
    CityField
  },
  emits: [
    'avatarChange'
  ],
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    avatar () {
      return this.profileInfo.avatar
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
