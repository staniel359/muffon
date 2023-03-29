<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <BaseProfileFollowingMessage
      v-if="otherProfileData"
      :other-profile-data="otherProfileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileFollowingMessage
  from '@/components/models/profile/BaseProfileFollowingMessage.vue'

export default {
  name: 'FollowingSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileFollowingMessage
  },
  props: {
    otherProfileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
