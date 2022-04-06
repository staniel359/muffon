<template>
  <slot
    v-bind="$attrs"
    :icon="icon"
    :text="membershipText"
    :isLoading="isLoading"
    :isMember="isMember"
    :onClick="onClick"
  ></slot>
</template>

<script>
import createMember from '*/helpers/actions/api/community/member/create'
import deleteMember from '*/helpers/actions/api/community/member/delete'

export default {
  name: 'BaseCommunityJoinButtonContainer',
  inject: [
    'setIsMember',
    'setMembersCount'
  ],
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  data () {
    return {
      isMember: false,
      isLoading: false
    }
  },
  computed: {
    icon () {
      if (this.isMember) {
        return 'minus'
      } else {
        return 'plus'
      }
    },
    membershipText () {
      return this.$t(
        `memberships.${this.membershipTextKey}`
      )
    },
    membershipTextKey () {
      if (this.isMember) {
        return 'leave'
      } else {
        return 'join'
      }
    },
    memberData () {
      return {
        communityId: this.communityId
      }
    },
    communityId () {
      return this.communityData.id.toString()
    }
  },
  mounted () {
    this.isMember =
      this.communityData
        .profile
        .member_of_community
  },
  methods: {
    handleJoinSuccess (response) {
      this.isMember = true

      this.setIsMember(true)
      this.setMembersCount(
        response.data.community_members_count
      )
    },
    handleLeaveSuccess (response) {
      this.isMember = false

      this.setIsMember(false)
      this.setMembersCount(
        response.data.community_members_count
      )
    },
    createMember,
    deleteMember,
    onClick () {
      if (this.isMember) {
        this.leave()
      } else {
        this.join()
      }

      this.$emit('click')
    },
    join () {
      this.createMember(
        this.memberData
      ).then(
        this.handleJoinSuccess
      )
    },
    leave () {
      this.deleteMember(
        this.memberData
      ).then(
        this.handleLeaveSuccess
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
