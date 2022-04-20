<template>
  <BaseSegmentContainer>
    <BaseAccordionContainer
      :title="addTracksText"
    >
      <div class="ui buttons">
        <SearchImportButton
          :playlist-id="playlistId"
        />

        <LibraryImportButton
          :playlist-id="playlistId"
        />
      </div>
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import SearchImportButton from './ImportSegment/SearchImportButton.vue'
import LibraryImportButton from './ImportSegment/LibraryImportButton.vue'

export default {
  name: 'ImportSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    SearchImportButton,
    LibraryImportButton
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

<style lang="sass" scoped></style>
