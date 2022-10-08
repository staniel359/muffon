<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseCountrySelectSection
      :country="country"
      @select="handleCountrySelect"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseCountrySelectSection
  from '@/components/sections/BaseCountrySelectSection.vue'

export default {
  name: 'TopSegment',
  components: {
    BaseSegmentContainer,
    BaseCountrySelectSection
  },
  props: {
    country: String
  },
  emits: [
    'countrySelect'
  ],
  methods: {
    handleCountrySelect (
      value
    ) {
      this.$emit(
        'countrySelect',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
