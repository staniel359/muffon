<template>
  <BaseSegmentContainer
    v-if="isRender"
    class="main-profile-page-info"
  >
    <BaseProfileGenderAge
      :profile-data="profileData"
    />

    <BaseProfileCityCountry
      class="main-list-bottom-extrasmall-section"
      :profile-data="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileGenderAge
  from '@/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '@/components/models/profile/BaseProfileCityCountry.vue'

export default {
  name: 'ExtraInfoSegment',
  components: {
    BaseSegmentContainer,
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
    isRender () {
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
