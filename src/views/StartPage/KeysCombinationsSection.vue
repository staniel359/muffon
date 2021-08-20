<template>
  <div class="ui segments keys-combinations">
    <BaseSegmentContainer
      v-for="combinationData in combinationsFormatted"
      :key="combinationData.uuid"
      class="keys-combination"
    >
      <BaseHeader
        tag="h4"
        :text="combinationData.header"
      />

      <BaseCode :text="combinationData.code" />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseCode from '@/BaseCode.vue'
import { localize } from '#/actions/plugins/i18n'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'KeysCombinationsSection',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseCode
  },
  computed: {
    combinationsFormatted () {
      return formatCollection(
        this.combinations
      )
    },
    combinations () {
      return [
        {
          header: this.searchHeaderFormatted,
          code: 'Ctrl/⌘ + F'
        },
        {
          header: this.openInHeaderFormatted,
          code: 'Ctrl/⌘ + Left Click'
        },
        {
          header: this.closeTabHeaderFormatted,
          code: 'Ctrl/⌘ + W'
        }
      ]
    },
    searchHeaderFormatted () {
      return localize(
        'pages.start.keys.search'
      )
    },
    openInHeaderFormatted () {
      return localize(
        'pages.start.keys.openInTab'
      )
    },
    closeTabHeaderFormatted () {
      return localize(
        'pages.start.keys.closeTab'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.keys-combinations
  @extend .no-margin
  width: 400px

.keys-combination
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
