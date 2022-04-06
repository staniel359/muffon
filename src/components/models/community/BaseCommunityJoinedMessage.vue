<template>
  <div
    v-if="isMember"
    class="main-joined-message-container"
  >
    <div class="main-joined-message">
      <i class="green left arrow icon"></i>

      <div>
        {{ joinedText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCommunityJoinedMessage',
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isMember () {
      return this.communityData
        .profile
        .member_of_community
    },
    joinedText () {
      return this.$t(
        'memberships.joined'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
