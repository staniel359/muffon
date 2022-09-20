<template>
  <BaseSegmentContainer
    class="options-segment"
  >
    <BaseProfileOptionsDropdown
      :profile-data="profileData"
      is-with-follow-option
      is-with-message-option
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileOptionsDropdown
  from '@/components/dropdowns/profile/BaseProfileOptionsDropdown.vue'

export default {
  name: 'OptionsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileOptionsDropdown
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped>
.options-segment
  @extend .d-flex, .justify-content-flex-end
</style>
