<template>
  <BaseSegmentContainer
    class="center-aligned"
  >
    <BaseCounterSection
      class="main-link"
      scope="members"
      :count="membersCount"
      @click="handleMembersCountClick"
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
import BaseCounterSection from '@/components/sections/BaseCounterSection.vue'
import BaseCommunityMembersModal
  from '@/components/modals/community/BaseCommunityMembersModal.vue'

export default {
  name: 'MembersSegment',
  components: {
    BaseSegmentContainer,
    BaseCounterSection,
    BaseCommunityMembersModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    membersCount () {
      return this.communityData.members_count
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
