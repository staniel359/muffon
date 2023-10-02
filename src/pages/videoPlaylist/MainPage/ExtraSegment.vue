<template>
  <BaseSegmentContainer
    class="main-page-top-section"
  >
    <div class="section" />

    <div class="section">
      <BaseViewSelect
        class="section-item"
        :scope="scope"
        :view-id="viewId"
      />
    </div>
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

<style lang="sass" scoped></style>
