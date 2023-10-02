<template>
  <Component
    :is="component"
    v-if="isRender"
    class="middle-aligned-column"
  >
    <div class="middle-aligned">
      <BaseIcon
        class="green"
        icon="communityJoined"
        is-with-rtl
      />

      <div
        v-text="joinedText"
      />
    </div>
  </Component>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
    ...mapState(
      profileStore,
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
