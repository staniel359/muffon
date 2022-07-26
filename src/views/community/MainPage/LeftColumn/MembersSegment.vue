<template>
  <BaseSegmentContainer
    class="members-segment"
  >
    <span
      class="main-link"
      @click="handleMembersCountClick"
      v-html="membersCountText"
    />

    <BaseCommunityMembersModal
      ref="modal"
      :community-id="communityId"
    />

    <BaseCommunityJoinedMessage
      class="joined-message"
      :community-data="communityData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityMembersModal
  from '*/components/modals/community/BaseCommunityMembersModal.vue'
import BaseCommunityJoinedMessage
  from '*/components/models/community/BaseCommunityJoinedMessage.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'MembersSegment',
  components: {
    BaseSegmentContainer,
    BaseCommunityMembersModal,
    BaseCommunityJoinedMessage
  },
  props: {
    communityData: Object
  },
  computed: {
    membersCountText () {
      return this.$tc(
        'counters.nominative.members',
        this.membersCount,
        {
          count: this.membersCountStrong
        }
      )
    },
    membersCount () {
      return this.communityData.members_count
    },
    membersCountStrong () {
      return `<strong>${this.membersCountFormatted}</strong>`
    },
    membersCountFormatted () {
      return formatNumber(
        this.membersCount
      )
    },
    communityId () {
      return this.communityData.id.toString()
    }
  },
  methods: {
    handleMembersCountClick () {
      this.showMembersModal()
    },
    showMembersModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.members-segment
  @extend .text-align-center

.joined-message
  margin-top: 0.5em
</style>
