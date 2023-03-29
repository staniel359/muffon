<template>
  <BaseSegmentContainer
    v-if="isRender"
  >
    <BaseCommunityJoinedMessage
      :community-data="communityData"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityJoinedMessage
  from '@/components/models/community/BaseCommunityJoinedMessage.vue'

export default {
  name: 'JoinedSegment',
  components: {
    BaseSegmentContainer,
    BaseCommunityJoinedMessage
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
