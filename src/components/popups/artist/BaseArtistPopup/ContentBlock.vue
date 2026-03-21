<template>
  <div class="d-flex">
    <LeftColumn
      :artist-data="artistData"
      :is-visible="isVisible"
    />

    <RightColumn
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />
  </div>

  <DescriptionSection
    :artist-data="artistData"
  />
</template>

<script>
import LeftColumn from './ContentBlock/LeftColumn.vue'
import RightColumn from './ContentBlock/RightColumn.vue'
import DescriptionSection from './ContentBlock/DescriptionSection.vue'

export default {
  name: 'ContentBlock',
  components: {
    LeftColumn,
    RightColumn,
    DescriptionSection
  },
  props: {
    artistData: Object,
    isVisible: Boolean
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
