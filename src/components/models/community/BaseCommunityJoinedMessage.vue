<template>
  <Component
    :is="component"
    v-if="isRender"
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
  </Component>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseCommunityJoinedMessage',
  components: {
    BaseIcon
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    isSmall: Boolean
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    component () {
      if (this.isSmall) {
        return 'small'
      } else {
        return 'div'
      }
    },
    isRender () {
      return (
        this.profileId &&
          this.isMember
      )
    },
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
