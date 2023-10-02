<template>
  <BaseSegmentContainer
    class="middle-aligned-space-between"
  >
    <div />

    <BaseLibraryOptionsPopup
      is-with-add-option
      is-with-import-option
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseLibraryOptionsPopup
  from '@/components/popups/library/BaseLibraryOptionsPopup.vue'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseLibraryOptionsPopup
  }
}
</script>

<style lang="sass" scoped></style>
