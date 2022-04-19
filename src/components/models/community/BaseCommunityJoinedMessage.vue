<template>
  <div
    v-if="isMember"
    class="main-joined-message-container"
  >
    <div class="main-joined-message">
      <BaseIcon
        icon="green left arrow"
      />

      <div
        v-text="joinedText"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseCommunityJoinedMessage',
  components: {
    BaseIcon
  },
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
