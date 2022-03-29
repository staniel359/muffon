<template>
  <BaseArtistSourceItemContainer
    :sourceId="sourceId"
    :query="query"
  >
    <template #default="slotProps">
      <SourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :artists="slotProps.artists"
      />
    </template>
  </BaseArtistSourceItemContainer>
</template>

<script>
import BaseArtistSourceItemContainer
  from '*/components/containers/artist/BaseArtistSourceItemContainer.vue'
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
    sourceId () {
      return this.sourceData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
