<template>
  <BaseTrackLyricsSourceItemContainer
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
        :tracks-data="slotProps.tracksData"
      />
    </template>
  </BaseTrackLyricsSourceItemContainer>
</template>

<script>
import BaseTrackLyricsSourceItemContainer
  from '@/components/containers/track/lyrics/BaseTrackLyricsSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseTrackLyricsSourceItemContainer,
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
