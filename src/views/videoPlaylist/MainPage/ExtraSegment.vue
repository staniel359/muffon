<template>
  <BaseSegmentContainer
    class="extra-segment"
  >
    <div />

    <BaseViewSelect
      class="view-select-block"
      :scope="scope"
      :view-id="viewId"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseViewSelect from '@/components/selects/BaseViewSelect.vue'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseViewSelect
  },
  props: {
    viewId: String,
    scope: String
  }
}
</script>

<style lang="sass" scoped>
.extra-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between

.view-select-block
  margin-left: 0.75em
</style>
