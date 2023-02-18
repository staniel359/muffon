<template>
  <BaseSegmentContainer
    class="main-community-info-segment"
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityMembersModal
  from '@/components/modals/community/BaseCommunityMembersModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'MembersSegment',
  components: {
    BaseSegmentContainer,
    BaseCommunityMembersModal
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

<style lang="sass" scoped></style>
