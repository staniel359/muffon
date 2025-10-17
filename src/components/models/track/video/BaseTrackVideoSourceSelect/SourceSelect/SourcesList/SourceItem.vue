<template>
  <BaseTrackVideoSourceItemContainer
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
        :videos="slotProps.videos"
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
