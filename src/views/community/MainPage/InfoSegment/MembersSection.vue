<template>
  <BaseCounterSection
    v-bind="$attrs"
    class="main-link"
    scope="members"
    :count="membersCount"
    @click="handleMembersCountClick"
  />

  <BaseCommunityMembersModal
    ref="modal"
    :community-id="communityId"
  />
</template>

<script>
import BaseCounterSection from '@/components/sections/BaseCounterSection.vue'
import BaseCommunityMembersModal
  from '@/components/modals/community/BaseCommunityMembersModal.vue'

export default {
  name: 'MembersSection',
  components: {
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
