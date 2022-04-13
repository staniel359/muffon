<template>
  <BaseSegmentContainer>
    <BaseAccordionContainer
      :title="addTracksText"
    >
      <SearchImportBlock
        :playlist-id="playlistId"
      />
      <LibraryImportBlock
        :playlist-id="playlistId"
      />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import SearchImportBlock from './ImportSegment/SearchImportBlock.vue'
import LibraryImportBlock from './ImportSegment/LibraryImportBlock.vue'

export default {
  name: 'ImportSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    SearchImportBlock,
    LibraryImportBlock
  },
  props: {
    playlistId: String
  },
  computed: {
    addTracksText () {
      return this.$t(
        'actions.add.tracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.import-button)
  @extend .no-margin
  &:not(:first-child)
    margin-left: 1em !important
</style>
