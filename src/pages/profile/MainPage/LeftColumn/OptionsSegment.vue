<template>
  <BaseSegmentContainer
    class="end-aligned"
  >
    <BaseProfileOptionsPopup
      :profile-data="profileData"
      is-with-follow-option
      is-with-message-option
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileOptionsPopup
  from '@/components/popups/profile/BaseProfileOptionsPopup.vue'

export default {
  name: 'OptionsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileOptionsPopup
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
