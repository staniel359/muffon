<template>
  <BaseSegmentContainer>
    <BaseCommunityJoinedMessage
      class="joined-message"
      :communityData="communityData"
    />

    <BaseCommunityJoinButton
      class="fluid"
      :communityData="communityData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityJoinedMessage
  from '*/components/models/community/BaseCommunityJoinedMessage.vue'
import BaseCommunityJoinButton
  from '*/components/models/community/BaseCommunityJoinButton.vue'

export default {
  name: 'JoinSegment',
  components: {
    BaseSegmentContainer,
    BaseCommunityJoinedMessage,
    BaseCommunityJoinButton
  },
  props: {
    communityData: Object
  }
}
</script>

<style lang="sass" scoped>
.joined-message
  margin-bottom: 1em
</style>
