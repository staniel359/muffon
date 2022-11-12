<template>
  <BaseArtistSourceItemContainer
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
        :artists="slotProps.artists"
      />
    </template>
  </BaseArtistSourceItemContainer>
</template>

<script>
import BaseArtistSourceItemContainer
  from '@/components/containers/artist/BaseArtistSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseArtistSourceItemContainer,
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
