<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <BaseAccordionContainer
      :title="headerFormatted"
    >
      <SearchImportBlock />
      <AccountImportBlock
        v-if="lastfmNickname"
      />
      <FolderImportBlock />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    headerFormatted () {
      return this.$t(
        'shared.library.add'
      )
    },
    lastfmNickname () {
      return this.profileInfo.lastfm_nickname
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
