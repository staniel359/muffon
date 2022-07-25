<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileFollowCounters
  from '*/components/models/profile/BaseProfileFollowCounters.vue'
import BaseProfileFollowModal
  from '*/components/modals/profile/BaseProfileFollowModal.vue'

export default {
  name: 'FollowSegment',
  components: {
    BaseSegmentContainer,
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
