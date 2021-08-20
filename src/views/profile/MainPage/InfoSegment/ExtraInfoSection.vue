<template>
  <template v-if="isAnyInfo">
    <BaseDivider/>

    <div class="main-library-info">
      <GenderAgeSection
        v-if="gender || birthdate"
        :gender="gender"
        :birthdate="birthdate"
      />

      <CityCountrySection
        v-if="city || country"
        :city="city"
        :country="country"
      />
    </div>
  </template>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import GenderAgeSection from './ExtraInfoSection/GenderAgeSection.vue'
import CityCountrySection from './ExtraInfoSection/CityCountrySection.vue'

export default {
  name: 'ExtraInfoSection',
  components: {
    BaseDivider,
    GenderAgeSection,
    CityCountrySection
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
