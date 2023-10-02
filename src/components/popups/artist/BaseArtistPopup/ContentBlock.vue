<template>
  <div class="d-flex">
    <LeftColumn
      :artist-data="artistData"
    />

    <RightColumn
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import LeftColumn from './ContentBlock/LeftColumn.vue'
import RightColumn from './ContentBlock/RightColumn.vue'

export default {
  name: 'ContentBlock',
  components: {
    LeftColumn,
    RightColumn
  },
  props: {
    artistData: Object
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
