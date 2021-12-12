<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <BaseAccordionContainer
      :title="addText"
    >
      <SearchImportBlock />
      <AccountImportBlock />
      <FolderImportBlock />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import SearchImportBlock from './ImportSegment/SearchImportBlock.vue'
import AccountImportBlock from './ImportSegment/AccountImportBlock.vue'
import FolderImportBlock from './ImportSegment/FolderImportBlock.vue'

export default {
  name: 'ImportSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    SearchImportBlock,
    AccountImportBlock,
    FolderImportBlock
  },
  computed: {
    addText () {
      return this.$t(
        'shared.library.add'
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
