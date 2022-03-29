<template>
  <BaseDivider/>

  <div class="main-profile-page-info">
    <BaseProfileGenderAge
      :profileData="profileData"
    />

    <BaseProfileCityCountry
      :profileData="profileData"
    />

    <BaseProfileFollowingCount
      class="following-count"
      :profileData="profileData"
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseProfileGenderAge
  from '*/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '*/components/models/profile/BaseProfileCityCountry.vue'
import BaseProfileFollowingCount
  from '*/components/models/profile/BaseProfileFollowingCount.vue'

export default {
  name: 'ExtraInfoSection',
  components: {
    BaseDivider,
    BaseProfileGenderAge,
    BaseProfileCityCountry,
    BaseProfileFollowingCount
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.following-count
  @extend .d-flex, .flex-column, .align-items-center
</style>
