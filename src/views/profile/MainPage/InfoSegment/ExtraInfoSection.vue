<template>
  <BaseDivider />

  <div class="main-profile-page-info">
    <BaseProfileGenderAge
      :profile-data="profileData"
    />

    <BaseProfileCityCountry
      :profile-data="profileData"
    />

    <BaseProfileFollowCounters
      class="follow-counters"
      :profile-data="profileData"
      is-clickable
      @followers-link-click="handleFollowersLinkClick"
      @following-link-click="handleFollowingLinkClick"
    />

    <BaseProfileFollowModal
      ref="followersModal"
      scope="followers"
      :profile-id="profileId"
    />

    <BaseProfileFollowModal
      ref="followingModal"
      scope="following"
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseProfileGenderAge
  from '*/components/models/profile/BaseProfileGenderAge.vue'
import BaseProfileCityCountry
  from '*/components/models/profile/BaseProfileCityCountry.vue'
import BaseProfileFollowCounters
  from '*/components/models/profile/BaseProfileFollowCounters.vue'
import BaseProfileFollowModal
  from '*/components/modals/profile/BaseProfileFollowModal.vue'

export default {
  name: 'ExtraInfoSection',
  components: {
    BaseDivider,
    BaseProfileGenderAge,
    BaseProfileCityCountry,
    BaseProfileFollowCounters,
    BaseProfileFollowModal
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileId () {
      return this.profileData.id.toString()
    }
  },
  methods: {
    handleFollowersLinkClick () {
      this.showFollowersModal()
    },
    handleFollowingLinkClick () {
      this.showFollowingModal()
    },
    showFollowersModal () {
      this.$refs
        .followersModal
        .show()
    },
    showFollowingModal () {
      this.$refs
        .followingModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.follow-counters
  @extend .d-flex, .flex-column, .align-items-center
</style>
