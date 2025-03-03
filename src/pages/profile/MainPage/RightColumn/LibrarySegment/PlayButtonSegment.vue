<template>
  <BaseSegmentContainer
    class="bordered"
  >
    <BaseProfileLibraryTracksPlayButton
      :profile-id="profileId"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryTracksPlayButton
  from '@/components/buttons/play/profile/library/BaseProfileLibraryTracksPlayButton.vue'

export default {
  name: 'PlayButtonSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryTracksPlayButton
  },
  props: {
    profileId: Number
  }
}
</script>

<style lang="sass" scoped></style>
