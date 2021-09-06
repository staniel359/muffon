<template>
  <div
    :class="[
      'ui segments',
      'keys-combinations',
      'main-segment-container'
    ]"
  >
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
          header: this.$t(
            'pages.start.keys.search'
          ),
          code: 'Ctrl/⌘ + F'
        },
        {
          header: this.$t(
            'pages.start.keys.openInTab'
          ),
          code: 'Ctrl/⌘ + Left Click'
        },
        {
          header: this.$t(
            'pages.start.keys.closeTab'
          ),
          code: 'Ctrl/⌘ + W'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.keys-combinations
  width: 400px

.keys-combination
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
