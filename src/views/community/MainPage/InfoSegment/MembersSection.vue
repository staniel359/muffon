<template>
  <div
    v-bind="$attrs"
    class="main-link members-count"
    @click="handleMembersCountClick"
    v-html="membersCountText"
  />

  <BaseCommunityMembersModal
    ref="modal"
    :community-id="communityId"
  />
</template>

<script>
import BaseCommunityMembersModal
  from '@/components/modals/community/BaseCommunityMembersModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'MembersSection',
  components: {
    BaseCommunityMembersModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
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
      return `
        <strong>
          ${this.membersCountFormatted}
        </strong>
      `
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
.members-count
  @extend .width-fit-content
</style>
