<template>
  <BaseSegmentContainer>
    <BaseAccordionContainer
      :title="addTracksText"
    >
      <SearchImportBlock
        :playlistId="playlistId"
      />
      <LibraryImportBlock
        :playlistId="playlistId"
      />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
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
        'shared.playlist.addTracks'
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
