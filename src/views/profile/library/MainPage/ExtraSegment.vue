<template>
  <BaseSegmentContainer
    class="import-segment"
  >
    <div />

    <BaseProfileLibraryOptionsPopup
      :is-with-add-option="isSelf"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryOptionsPopup
  from '@/components/popups/profile/library/BaseProfileLibraryOptionsPopup.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryOptionsPopup
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
