<template>
  <BaseOption
    :icon="icon"
    :text="membershipText"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'
import createMember from '@/helpers/actions/api/community/member/create'
import deleteMember from '@/helpers/actions/api/community/member/delete'

export default {
  name: 'JoinOption',
  components: {
    BaseOption
  },
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
      membersCount: null,
      isMember: false,
      isLoading: false,
      isError: false
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
  watch: {
    isMember: 'handleIsMemberChange',
    membersCount: 'handleMembersCountChange'
  },
  beforeMount () {
    this.isMember =
      this.communityData
        .profile
        .member_of_community
  },
  methods: {
    createMember,
    deleteMember,
    handleIsMemberChange (
      value
    ) {
      this.setIsMember(
        value
      )
    },
    handleMembersCountChange (
      value
    ) {
      this.setMembersCount(
        value
      )
    },
    handleClick () {
      if (this.isMember) {
        this.leave()
      } else {
        this.join()
      }

      this.$emit(
        'click'
      )
    },
    join () {
      this.createMember(
        this.memberData
      )
    },
    leave () {
      this.deleteMember(
        this.memberData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
