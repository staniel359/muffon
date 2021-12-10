<template>
  <template v-if="isAnyInfo">
    <BaseDivider/>

    <div class="main-profile-page-info">
      <BaseProfileGenderAge
        v-if="gender || birthdate"
        :gender="gender"
        :birthdate="birthdate"
      />

      <BaseProfileCityCountry
        v-if="city || country"
        :city="city"
        :country="country"
      />
    </div>
  </template>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseProfileGenderAge from '@/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '@/models/profile/BaseProfileCityCountry.vue'

export default {
  name: 'ExtraInfoSection',
  components: {
    BaseDivider,
    BaseProfileGenderAge,
    BaseProfileCityCountry
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAnyInfo () {
      return (
        this.gender ||
          this.birthdate ||
          this.city ||
          this.country
      )
    },
    gender () {
      return this.profileData.gender
    },
    birthdate () {
      return this.profileData.birthdate
    },
    city () {
      return this.profileData.city
    },
    country () {
      return this.profileData.country
    }
  }
}
</script>

<style lang="sass" scoped></style>
