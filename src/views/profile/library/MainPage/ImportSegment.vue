<template>
  <BaseSegmentContainer>
    <BaseAccordionContainer
      :title="addText"
    >
      <div class="ui buttons">
        <SearchImportButton />

        <AccountImportButton />

        <FolderImportButton />
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
import AccountImportButton from './ImportSegment/AccountImportButton.vue'
import FolderImportButton from './ImportSegment/FolderImportButton.vue'

export default {
  name: 'ImportSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    SearchImportButton,
    AccountImportButton,
    FolderImportButton
  },
  computed: {
    addText () {
      return this.$t(
        'actions.addTo.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
