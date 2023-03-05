<template>
  <BaseTrackVideoSourceItemContainer
    :source="source"
    :types="types"
    :query="query"
  >
    <template
      #default="slotProps"
    >
      <SourceItemContent
        :source-data="sourceData"
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :videos-data="slotProps.videosData"
      />
    </template>
  </BaseTrackVideoSourceItemContainer>
</template>

<script>
import BaseTrackVideoSourceItemContainer
  from '@/components/containers/track/video/BaseTrackVideoSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseTrackVideoSourceItemContainer,
    SourceItemContent
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    query: String
  },
  computed: {
    source () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.videoTypes
    }
  }
}
</script>

<style lang="sass" scoped></style>
