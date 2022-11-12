<template>
  <BaseTrackSourceItemContainer
    :source="source"
    :query="query"
  >
    <template
      #default="slotProps"
    >
      <SourceItemContent
        :source-data="sourceData"
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :tracks="slotProps.tracks"
        :is-with-max-bitrate="isWithMaxBitrate"
      />
    </template>
  </BaseTrackSourceItemContainer>
</template>

<script>
import BaseTrackSourceItemContainer
  from '@/components/containers/track/BaseTrackSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseTrackSourceItemContainer,
    SourceItemContent
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    query: String,
    isWithMaxBitrate: Boolean
  },
  computed: {
    source () {
      return this.sourceData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
