<template>
  <BaseTrackSourceItemContainer
    :sourceId="sourceId"
    :query="query"
  >
    <template #default="slotProps">
      <SourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :tracks="slotProps.tracks"
        :isWithMaxBitrate="isWithMaxBitrate"
      />
    </template>
  </BaseTrackSourceItemContainer>
</template>

<script>
import BaseTrackSourceItemContainer
  from '*/components/containers/track/BaseTrackSourceItemContainer.vue'
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
    sourceId () {
      return this.sourceData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
