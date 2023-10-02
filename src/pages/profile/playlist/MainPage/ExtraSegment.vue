<template>
  <BaseSegmentContainer
    class="middle-aligned-space-between"
  >
    <div />

    <BaseOrderSelect
      model="playlistTrack"
      :order="order"
      @select="handleOrderSelect"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseOrderSelect from '@/components/selects/BaseOrderSelect.vue'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseOrderSelect
  },
  inject: {
    setOrder: {
      default: () => false
    }
  },
  props: {
    order: String
  },
  methods: {
    handleOrderSelect (
      value
    ) {
      this.setOrder(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
