<template>
  <BaseSegmentContainer
    class="import-segment"
  >
    <div />

    <BaseLibraryOptionsDropdown
      :is-with-add-option="isSelf"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseLibraryOptionsDropdown
  from '@/components/dropdowns/library/BaseLibraryOptionsDropdown.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseLibraryOptionsDropdown
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.import-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
